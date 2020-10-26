export interface MetricsOptions {
  label?: string;
  value: string;
  unit?: string;
  mode?: MetricsMode;
  showUnit?: boolean;
}

export type MetricsMode =
  | 'block'
  | 'block-2'
  | 'block-3'
  | 'inline'
  | 'inline-2';
export type MetricsUnitMode = 'label' | 'label' | 'auto';

export type BackgroundType = 'color' | 'image';

export type BackgroundPositionValue =
  | 'top'
  | 'center'
  | 'bottom'
  | 'left'
  | 'right';
export interface BackgroundPosition {
  x: BackgroundPositionValue | string | number;
  y: BackgroundPositionValue | string | number;
}

export type BackgroundSizeValue = 'cover' | 'contain';
export interface Background {
  type: BackgroundType;
  color: string;
  image: string;
  position: BackgroundPosition;
}
export interface WidgetTheme {
  background?: Background;
  font?: Font;
}
export interface Font {
  lineHeight: number;
  size: number;
  family: string;
  color: string;
}

export interface MetricsTheme extends WidgetTheme {
  style?: { common?: string; label?: string; value?: string; unit?: string }; // 自定义配置
  background?: Background;
  font?: Font;
}
