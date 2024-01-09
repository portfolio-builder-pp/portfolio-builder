export enum PropertyType {
  ColorRGB = 'color-rgb',
  ColorHEX = 'color-hex',
  Custom = 'custom',
  Text = 'text',
}

export enum PropertyName {
  FontColor = 'font-color',
  FontFamily = 'font-family',
  AppName = 'app-name',
  AppDescription = 'app-description',
}

export interface PropertyDto {
  name: PropertyName;
  value: string;
  type: PropertyType;
}
