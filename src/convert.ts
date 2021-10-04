import {
  HSV,
  HSL,
  RGB,
  CMYK,
  Hex,
} from "./types";

export function RGBToHSV(value: RGB): HSV {
  const [r, g, b] = value.map((v) => v / 255);
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
  return [h, s, v] as HSV;
}

export function HSVToRGB(value: HSV): RGB {
  const [h, s, v] = value;
  const c = v * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = v - c;
  const raw = (function(): RGB {
    if (h >= 0 && h < 60)
      return [c, x, 0] as RGB;
    if (h >= 60 && h < 120)
      return [x, c, 0] as RGB;
    if (h >= 120 && h < 180)
      return [0, c, x] as RGB;
    if (h >= 180 && h < 240)
      return [0, x, c] as RGB;
    if (h >= 240 && h < 300)
      return [x, 0, c] as RGB;
    return [c, 0, x] as RGB;
  })();
  return raw.map((v) => Math.round((v + m) * 255)) as RGB;
}

export function HexToRGB(value: Hex): RGB {
  value = value.startsWith("#") ? value.substring(1) as Hex : value;
  if (value.length === 3)
    return value.match(/./g)!.map((c) => parseInt(`${c}${c}`, 16)) as RGB;
  return value.match(/../g)!.map((c) => parseInt(c, 16)) as RGB;
}

export function RGBToHex(value: RGB): Hex {
  return value.map((v) => v.toString(16).padStart(2, "0")).join("") as Hex;
}

export function HexToHSV(value: Hex): HSV {
  return RGBToHSV(HexToRGB(value));
}

export function HSVToHex(value: HSV): Hex {
  return RGBToHex(HSVToRGB(value));
}

export default function convert(): null {
  return null;
}
