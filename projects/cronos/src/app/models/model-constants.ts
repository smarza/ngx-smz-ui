export const ModelConstants: ModelConstants = {
  shortName: { minLength: 3, maxLength: 32 },
  duration: { minLength: 1, maxLength: 365 },
  hidroblastQuantity: { minLength: 1, maxLength: 1000 }
};

export interface ModelConstants {
  shortName: MinMaxLength;
  duration: MinMaxLength;
  hidroblastQuantity: MinMaxLength;
}

export interface MinMaxLength {
  minLength: number;
  maxLength: number;
}