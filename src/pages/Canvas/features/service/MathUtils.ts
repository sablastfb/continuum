import { SimplePoint } from "../../data/types/Types";

export namespace  Continuum_Math{
    export function Distance<P extends SimplePoint>(pStart: P, pEnd: P): number{
        return Math.sqrt(Math.pow(pStart.x - pEnd.x, 2) + Math.pow(pStart.y - pEnd.y, 2));
    }
}