import { Drawable } from "./interfaces/Drawable";
import { Vector } from "./Vector";

export class CastedRay implements Drawable {
	public position: Vector;
	public angle: number;
	public distance: number;

	constructor(position: Vector, angle: number, distance: number) {
		this.position = position;
		this.angle = angle;
		this.distance = distance;
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		const endPosition = Vector.fromAngle(this.angle).multiply(this.distance).add(this.position);

		canvasContext.strokeStyle = "rgb(150, 150, 150)";
		canvasContext.moveTo(this.position.x, this.position.y);
		canvasContext.lineTo(endPosition.x, endPosition.y);
		canvasContext.stroke();
	}
}