export const ModelConstants: ModelConstants = {
  shortName: { minLength: 3, maxLength: 64 },
  longName: { minLength: 3, maxLength: 255 },
  shortDescription: { minLength: 3, maxLength: 1024 },
  longDescription: { minLength: 3, maxLength: 4096 },
  pathLength: { minLength: 3, maxLength: 256 },
  petrobrasKey: { minLength: 4, maxLength: 4 },
  roleName: { minLength: 3, maxLength: 32 },
  userName: { minLength: 4, maxLength: 6 },
};

export interface ModelConstants {
  shortName: MinMaxLength;
  longName: MinMaxLength;
  shortDescription: MinMaxLength;
  longDescription: MinMaxLength;
  pathLength: MinMaxLength;
  petrobrasKey: MinMaxLength;
  roleName: MinMaxLength;
  userName: MinMaxLength;
}

export interface MinMaxLength {
  minLength: number;
  maxLength: number;
}