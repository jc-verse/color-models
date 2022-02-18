type Color<Model, ID extends string> = Model & { __model: ID };

export type HSV = Color<[number, number, number], "hsv">;
export type HSL = Color<[number, number, number], "hsl">;
export type RGB = Color<[number, number, number], "rgb">;
export type CMYK = Color<[number, number, number, number], "cmyk">;
export type Hex = Color<string, "hex">;

export function isRGB(value: unknown): value is RGB {
  if (!Array.isArray(value) || value.length !== 3) return false;
  return value.every((v) => v >= 0 && v <= 255);
}

export function isHSV(value: unknown): value is HSV {
  if (!Array.isArray(value) || value.length !== 3) return false;
  return (
    value[0] >= 0 &&
    value[0] <= 360 &&
    value[1] >= 0 &&
    value[1] <= 1 &&
    value[2] >= 0 &&
    value[2] <= 1
  );
}

export function isHex(value: unknown): value is Hex {
  if (typeof value !== "string") return false;
  const newValue = value.startsWith("#") ? value.substring(1) : value;
  return /^#?(?:[A-Za-z0-9]{3}|[A-Za-z0-9]{6})$/.test(newValue);
}
