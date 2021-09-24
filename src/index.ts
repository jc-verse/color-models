/* eslint-disable grouped-accessor-pairs */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
type HSV = [number, number, number];
type HSL = [number, number, number];
type RGB = [number, number, number];
type CMYK = [number, number, number, number];
type Hex = string;

class Color {

  private hsvModel: HSV;
  constructor(model: "rgb", values: RGB);
  constructor(model: "hsl", values: HSL);
  constructor(model: "hsv", values: HSV);
  constructor(model: "cmyk", values: CMYK);
  constructor(model: "hex", values: Hex);
  constructor(model: string, values: number[] | string) {
    switch (model) {
    case "rgb":
      if (!Color.isRGB(values))
        throw new Error(`Bad RGB initializer: ${values}`);
      this.hsvModel = Color.RGBToHSV(values);
      break;
    case "hsv":
      if (!Color.isHSV(values))
        throw new Error(`Bad HSV initializer: ${values}`);
      this.hsvModel = values;
      break;
    case "hsl": break;
    case "hex":
      if (!Color.isHex(values))
        throw new Error(`Bad HSV initializer: ${values}`);
      this.hsvModel = Color.HexToHSV(values);
      break;
    }
  }

  // Getters
  get RGB(): RGB {
    return Color.HSVToRGB(this.hsvModel);
  }

  get HSV(): HSV {
    return this.hsvModel;
  }

  get Hex(): Hex {
    return Color.HSVToHex(this.hsvModel);
  }

  // Setters
  set RGB(values: RGB) {
    this.hsvModel = Color.RGBToHSV(values);
  }

  set HSV(values: HSV) {
    this.hsvModel = values;
  }

  set Hex(value: Hex) {
    this.hsvModel = Color.HexToHSV(value);
  }

  // Checkers
  static isRGB(values: unknown): values is RGB {
    if (!Array.isArray(values) || values.length !== 3)
      return false;
    return values.every((v) => v >= 0 && v <= 255);
  }

  static isHSV(values: unknown): values is HSV {
    if (!Array.isArray(values) || values.length !== 3)
      return false;
    return values[0] >= 0 && values[0] <= 360 && values[1] >= 0 && values[1] <= 1 && values[2] >= 0 && values[2] <= 1;
  }

  static isHex(value: unknown): value is Hex {
    if (typeof value !== "string")
      return false;
    const newValue = value.startsWith("#") ? value.substring(1) : value;
    return /^#?(?:[A-Za-z0-9]{3}|[A-Za-z0-9]{6})$/.test(newValue);
  }

  // Converters
  static RGBToHSV(values: RGB): HSV {
    const [r, g, b] = values.map((v) => v / 255);
    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const delta = cmax - cmin;
    const h = (function() {
      if (delta === 0)
        return 0;
      if (cmax === r)
        return 60 * ((g - b) / delta % 6);
      if (cmax === g)
        return 60 * ((b - r) / delta + 2);
      return 60 * ((r - g) / delta + 4);
    })();
    const s = cmax === 0 ? 0 : delta / cmax;
    const v = cmax;
    return [h, s, v];
  }

  static HSVToRGB(values: HSV): RGB {
    const [h, s, v] = values;
    const c = v * s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = v - c;
    const raw = (function(): RGB {
      if (h >= 0 && h < 60)
        return [c, x, 0];
      if (h >= 60 && h < 120)
        return [x, c, 0];
      if (h >= 120 && h < 180)
        return [0, c, x];
      if (h >= 180 && h < 240)
        return [0, x, c];
      if (h >= 240 && h < 300)
        return [x, 0, c];
      if (h >= 300 && h < 360)
        return [c, 0, x];
    })();
    return raw.map((v) => Math.round((v + m) * 255)) as RGB;
  }

  static HexToRGB(value: Hex): RGB {
    value = value.startsWith("#") ? value.substring(1) : value;
    if (value.length === 3)
      return value.match(/./g).map((c) => parseInt(`${c}${c}`, 16)) as RGB;
    if (value.length === 6)
      return value.match(/../g).map((c) => parseInt(c, 16)) as RGB;
  }

  static RGBToHex(values: RGB): Hex {
    return values.map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  static HexToHSV(value: Hex): HSV {
    return Color.RGBToHSV(Color.HexToRGB(value));
  }

  static HSVToHex(value: HSV): Hex {
    return Color.RGBToHex(Color.HSVToRGB(value));
  }

}

export default Color;
