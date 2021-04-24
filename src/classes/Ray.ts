import { CastedRay } from "./CastedRay";
import { Drawable } from "./interfaces/Drawable";
import { Vector } from "./Vector";
import { Wall } from "./Wall";

export class Ray implements Drawable {
	public position: Vector;
	public angle: number;
	private size = 20;

	constructor(position: Vector, angle: number) {
		this.position = position;
		this.angle = angle;
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		const endPosition = Vector.fromAngle(this.angle).multiply(this.size).add(this.position);

		canvasContext.moveTo(this.position.x, this.position.y);
		canvasContext.lineTo(endPosition.x, endPosition.y);
		canvasContext.strokeStyle = "rgba(255, 255, 255, 0.5)";
		canvasContext.stroke();
	}

	public cast(walls: Wall[]): CastedRay | null {
		let lowest = null;
		for (const wall of walls) {
			let point = this.findClosestPoint(wall);
			if (point) {
				let distance = point.distanceTo(this.position);
				if (lowest === null) {
					lowest = new CastedRay(this.position, this.angle, distance, wall.color);
				} else if (lowest.distance > distance) {
					lowest = new CastedRay(this.position, this.angle, distance, wall.color);
				}
			}
		}
		return lowest;
	}

	private findClosestPoint(wall: Wall): Vector | null {
		// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
		const angleVector = Vector.fromAngle(this.angle).add(this.position);

		const x1 = this.position.x;
		const y1 = this.position.y;
		const x2 = angleVector.x;
		const y2 = angleVector.y;
		const x3 = wall.a.x;
		const y3 = wall.a.y;
		const x4 = wall.b.x;
		const y4 = wall.b.y;

		const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
		const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

		if (t < 0 || u < 0 || u > 1) {
			return null;
		}

		const x = x1 + t * (x2 - x1);
		const y = y1 + t * (y2 - y1);
		return new Vector(x, y);
	}
}