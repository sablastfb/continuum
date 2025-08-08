import { Point } from "../../data/CanvasTypes";

export function Distance(pStart: Point, pEnd: Point): number{
    return Math.sqrt(Math.pow(pStart.x - pEnd.x, 2) + Math.pow(pStart.y - pEnd.y, 2));
}