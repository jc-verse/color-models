import { type HSV, type RGB, type Hex, isRGB, isHSV, isHex } from "./types";
import { rgbToHSV, hsvToRGB, hexToHSV, hsvToHex } from "./convert";

export class Color {
  private hsvModel: HSV;
  constructor(model: "rgb" | "hsl" | "hsv", value: [number, number, number]);
  constructor(model: "cmyk", value: [number, number, number, number]);
  constructor(model: "hex", value: string);
  constructor(model: string, value: number[] | string) {
    switch (model) {
      case "rgb":
        if (!isRGB(value)) throw new Error(`Bad RGB initializer: ${value}`);
        this.hsvModel = rgbToHSV(value);
        break;
      case "hsv":
        if (!isHSV(value)) throw new Error(`Bad HSV initializer: ${value}`);
        this.hsvModel = value;
        break;
      case "hsl":
        throw new Error("Not implemented");
      case "cmyk":
        throw new Error("Not implemented");
      case "hex":
        if (!isHex(value)) throw new Error(`Bad HSV initializer: ${value}`);
        this.hsvModel = hexToHSV(value);
        break;
      default:
        throw new Error(`Unknown color model: ${model}`);
    }
  }

  // Getters
  get RGB(): RGB {
    return hsvToRGB(this.hsvModel);
  }

  set RGB(value: [number, number, number]) {
    if (!isRGB(value)) throw new Error(`Bad RGB initializer: ${value}`);
    this.hsvModel = rgbToHSV(value);
  }

  get HSV(): HSV {
    return this.hsvModel;
  }

  set HSV(value: [number, number, number]) {
    if (!isHSV(value)) throw new Error(`Bad HSV initializer: ${value}`);
    this.hsvModel = value;
  }

  get Hex(): Hex {
    return hsvToHex(this.hsvModel);
  }

  set Hex(value: string) {
    if (!isHex(value)) throw new Error(`Bad Hex initializer: ${value}`);
    this.hsvModel = hexToHSV(value);
  }
}
