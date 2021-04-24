import { Drawable } from "./interfaces/Drawable";
import { Ray } from "./Ray";
import { Segment } from "./Segment";
import { Vector } from "./Vector";
import { Wall } from "./Wall";

export class Camera implements Drawable {
	private position: Vector;
	private angle: number;
	private fov: number;
	private viewDistance: number;
	private resolution: number;
	private walls: Wall[];
	private rays: Ray[] = [];
	private size: number = 5;
	private raysToShow: number = 50;

	constructor(x: number, y: number, angle: number, fov: number, viewDistance: number, resolution: number, walls: Wall[]) {
		this.position = new Vector(x, y)
		this.angle = angle;
		this.walls = walls;
		this.fov = fov;
		this.viewDistance = viewDistance;
		this.resolution = resolution;

		this.updateRays();
	}

	public moveForward(distance: number) {
		const movement = Vector.fromAngle(this.angle).multiply(distance);
		this.position.mutateAdd(movement);
	}

	public moveSide(distance: number) {
		const movement = Vector.fromAngle(this.angle + 90).multiply(distance);
		this.position.mutateAdd(movement);
	}

	public rotate(angle: number): void {
		this.angle += angle;
		this.updateRays();
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		const fractionToShow = this.rays.length > this.raysToShow ? this.rays.length / this.raysToShow : 1;
		let i = 0;
		for (const ray of this.rays) {
			if (i++ % fractionToShow === 0) {
				ray.cast(this.walls)?.draw(canvasContext);
			}
		}

		canvasContext.beginPath();
		canvasContext.fillStyle = "red";
		canvasContext.fillRect(this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
	}

	public getScene(width: number, height: number): Drawable[] {
		const drawables: Drawable[] = [];

		const segmentWidth = width / this.resolution;
		let i = 0;
		for (const ray of this.rays) {
			const castRay = ray.cast(this.walls);
			if (castRay) {
				const brightness = (this.viewDistance - castRay.distance) / this.viewDistance;

				if (brightness > 0) {
					const segment = new Segment(segmentWidth * i, brightness * height, segmentWidth + 1, brightness);
					drawables.push(segment);
				}
				i++;
			}
		}

		return drawables;
	}

	private updateRays(): void {
		this.rays = []
		for (let a = -this.fov / 2; a < this.fov / 2; a += (this.fov / this.resolution)) {
			this.rays.push(new Ray(this.position, this.angle + a));
		}
	}
}