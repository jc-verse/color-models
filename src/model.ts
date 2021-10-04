/* eslint-disable grouped-accessor-pairs */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {
  HSV,
  HSL,
  RGB,
  CMYK,
  Hex,
  isRGB,
  isHSV,
  isHex,
} from "./types";
import {
  RGBToHSV,
  HSVToRGB,
  HexToRGB,
  RGBToHex,
  HexToHSV,
  HSVToHex,
} from "./convert";

export class Color {

  private hsvModel: HSV;
  constructor(model: "rgb", value: [number, number, number]);
  constructor(model: "hsl", value: [number, number, number]);
  constructor(model: "hsv", value: [number, number, number]);
  constructor(model: "cmyk", value: [number, number, number, number]);
  constructor(model: "hex", value: string);
  constructor(model: string, value: number[] | string) {
    switch (model) {
    case "rgb":
      if (!isRGB(value))
        throw new Error(`Bad RGB initializer: ${value}`);
      this.hsvModel = RGBToHSV(value);
      break;
    case "hsv":
      if (!isHSV(value))
        throw new Error(`Bad HSV initializer: ${value}`);
      this.hsvModel = value;
      break;
    case "hsl": break;
    case "hex":
      if (!isHex(value))
        throw new Error(`Bad HSV initializer: ${value}`);
      this.hsvModel = HexToHSV(value);
      break;
    }
  }

  // Getters
  get RGB(): RGB {
    return HSVToRGB(this.hsvModel);
  }

  get HSV(): HSV {
    return this.hsvModel;
  }

  get Hex(): Hex {
    return HSVToHex(this.hsvModel);
  }

  // Setters
  set RGB(value: [number, number, number]) {
    if (!isRGB(value))
      throw new Error(`Bad RGB initializer: ${value}`);
    this.hsvModel = RGBToHSV(value);
  }

  set HSV(value: [number, number, number]) {
    if (!isHSV(value))
      throw new Error(`Bad HSV initializer: ${value}`);
    this.hsvModel = value;
  }

  set Hex(value: string) {
    if (!isHex(value))
      throw new Error(`Bad Hex initializer: ${value}`);
    this.hsvModel = HexToHSV(value);
  }

}
