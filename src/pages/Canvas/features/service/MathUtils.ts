import { SimplePoint } from "../../data/types/PointTypes";

export class Continuum_Math{
    public static Distance<P extends SimplePoint>(pStart: P, pEnd: P): number{
        return Math.sqrt(Math.pow(pStart.x - pEnd.x, 2) + Math.pow(pStart.y - pEnd.y, 2));
    }
}