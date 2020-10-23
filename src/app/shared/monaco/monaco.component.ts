import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

declare const monaco: any;

let loadedMonaco = false;
let loadPromise: Promise<void>;

export interface MonacoEditorConfig {
  baseUrl?: string;
  defaultOptions?: { [key: string]: any };
  onMonacoLoad?: () => void;
}
const monacoEditorConfig: MonacoEditorConfig = {
  baseUrl: './assets',
  onMonacoLoad: () => {},
  defaultOptions: {
    language: 'javascript',
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: 'vs-light',

    wordWrapMinified: false, // Set this to false to not auto word wrap minified files
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 120,
    wrappingIndent: 'indent', // try "same", "indent" or "none"

    glyphMargin: true,

    contextmenu: true,

    fontSize: 14,

    scrollbar: {
      // Subtle shadows to the left & top. Defaults to true.
      useShadows: true,

      // Render vertical arrows. Defaults to false.
      verticalHasArrows: true,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: true,

      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: 'visible',
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: 'auto',

      verticalScrollbarSize: 15,
      horizontalScrollbarSize: 15,
      arrowSize: 20,
    },
  },
};

export interface MonacoEditorModel {
  value: string;
  language?: string;
  uri?: any;
}

@Component({
  selector: 'app-monaco',
  templateUrl: './monaco.component.html',
  styleUrls: ['./monaco.component.less'],
})
export class MonacoComponent implements AfterViewInit, OnDestroy {
  private config: MonacoEditorConfig = monacoEditorConfig;
  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef;
  @Output()
  init = new EventEmitter<any>();
  protected editor: any;
  protected dstOptions: any;
  protected windowResizeSubscription: Subscription;

  private value = '';

  propagateChange = (_: any) => {};
  onTouched = () => {};

  @Input('options')
  set options(options: any) {
    this.dstOptions = Object.assign({}, this.config.defaultOptions, options);
    if (this.editor) {
      this.editor.dispose();
      this.initMonaco(options);
    }
  }

  get options(): any {
    return this.dstOptions;
  }

  @Input('model')
  set model(model: MonacoEditorModel) {
    this.options.model = model;
    if (this.editor) {
      this.editor.dispose();
      this.initMonaco(this.options);
    }
  }
  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this.dstOptions);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = this.config.baseUrl || './assets';
        if (typeof (window as any).monaco === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (window as any).require.config({
            paths: { vs: `${baseUrl}/vs` },
          });
          (window as any).require(['vs/editor/editor.main'], () => {
            if (typeof this.config.onMonacoLoad === 'function') {
              this.config.onMonacoLoad();
            }
            this.initMonaco(this.dstOptions);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(window as any).require) {
          const loaderScript: HTMLScriptElement = document.createElement(
            'script'
          );
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  writeValue(value: any): void {
    this.value = value || '';
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this.editor && !this.options.model) {
        this.editor.setValue(this.value);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected initMonaco(options: any): void {
    const hasModel = !!options.model;

    if (hasModel) {
      const model = monaco.editor.getModel(options.model.uri || '');
      if (model) {
        options.model = model;
        options.model.setValue(this.value);
      } else {
        options.model = monaco.editor.createModel(
          options.model.value,
          options.model.language,
          options.model.uri
        );
      }
    }

    this.editor = monaco.editor.create(
      this.editorContainer.nativeElement,
      options
    );

    if (!hasModel) {
      this.editor.setValue(this.value);
    }

    this.editor.onDidChangeModelContent((e: any) => {
      const value = this.editor.getValue();

      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => {
        this.propagateChange(value);
        this.value = value;
      });
    });

    this.editor.onDidBlurEditorWidget(() => {
      this.onTouched();
    });

    // refresh layout on resize event.
    if (this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
    }
    this.windowResizeSubscription = fromEvent(window, 'resize').subscribe(() =>
      this.editor.layout()
    );
    this.init.emit(this.editor);
  }

  ngOnDestroy(): void {
    if (this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
    }
    if (this.editor) {
      this.editor.dispose();
      this.editor = undefined;
    }
  }
}
