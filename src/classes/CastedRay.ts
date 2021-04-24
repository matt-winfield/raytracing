import { Color } from "./Color";
import { Drawable } from "./interfaces/Drawable";
import { Vector } from "./Vector";

export class CastedRay implements Drawable {
	public position: Vector;
	public angle: number;
	public distance: number;
	public color: Color;

	constructor(position: Vector, angle: number, distance: number, color: Color) {
		this.position = position;
		this.angle = angle;
		this.distance = distance;
		this.color = color;
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		const endPosition = Vector.fromAngle(this.angle).multiply(this.distance).add(this.position);

		canvasContext.beginPath();
		canvasContext.strokeStyle = "rgba(255, 255, 255, 0.5)";
		canvasContext.moveTo(this.position.x, this.position.y);
		canvasContext.lineTo(endPosition.x, endPosition.y);
		canvasContext.stroke();
		canvasContext.closePath();
	}
}