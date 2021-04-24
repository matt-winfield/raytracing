import { Color } from "./Color";
import { Drawable } from "./interfaces/Drawable";

export class Segment implements Drawable {
	private x: number;
	private height: number;
	private width: number;
	private color: Color;
	private brightness: number;

	constructor(x: number, height: number, width: number, color: Color, brightness: number) {
		this.x = x;
		this.height = height;
		this.width = width;
		this.color = color;
		this.brightness = brightness;
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		const canvasHeight = canvasContext.canvas.clientHeight;

		canvasContext.beginPath();
		canvasContext.fillStyle = `rgb(${this.color.red * this.brightness}, ${this.color.green * this.brightness}, ${this.color.blue * this.brightness})`;
		canvasContext.fillRect(this.x, canvasHeight / 2 - this.height / 2, this.width, this.height);
	}
}