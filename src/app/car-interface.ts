export interface CarModel {
  code: string;
  description: string;
  colors: CarColor[];
}

export interface CarColor {
  code: string;
  description: string;
  price: number;
}

export interface CarOptions {
  configs: CarConfig[];
  towHitch: boolean;
  yoke: boolean;
}

export interface CarConfig {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export interface CarModelDetails {
  model: string;
  color: string;
  modelDescription: string;
  colorDetails: CarColor | undefined
}

export interface CarOption {
  configs: CarConfig | undefined;
  towHitch: boolean;
  yoke: boolean;
}
