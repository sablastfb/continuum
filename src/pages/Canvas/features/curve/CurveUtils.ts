export class CurveUtils{
    public static ConverseLineToPath<P extends SimplePoint>(line: P[], tolerance: number=  2) {
        const path = new paper.Path([...line]);
        if (line.length > 2){
          path.simplify(tolerance);
        }
        return path;
      } 
}