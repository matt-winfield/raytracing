import { Color } from "./Color";
import { Drawable } from "./interfaces/Drawable";
import { Vector } from "./Vector";

export class Wall implements Drawable {
	public a: Vector;
	public b: Vector;
	public color: Color;

	constructor(x1: number, y1: number, x2: number, y2: number, color: Color = new Color(255, 255, 255)) {
		this.a = new Vector(x1, y1);
		this.b = new Vector(x2, y2)
		this.color = color;
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		canvasContext.moveTo(this.a.x, this.a.y);
		canvasContext.lineTo(this.b.x, this.b.y);
		canvasContext.strokeStyle = "white";
		canvasContext.stroke();
	}
}