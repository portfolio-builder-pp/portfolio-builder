export enum PropertyType {
  ColorRGB = 'color-rgb',
  ColorHEX = 'color-hex',
  Custom = 'custom',
}

export interface PropertyDto {
  name: string,
  value: string,
  type: PropertyType;
}