export class ShaderUtils {
  public static rgbStringToVec3(rgbString: string): [number, number, number] {
    const match = rgbString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
    );
    if (!match) {
      throw new Error("Invalid RGB string format");
    }

    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;

    return [r, g, b];
  }
}
