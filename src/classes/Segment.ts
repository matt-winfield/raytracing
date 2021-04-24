import { Drawable } from "./interfaces/Drawable";

export class Segment implements Drawable {
	private x: number;
	private height: number;
	private width: number;
	private brightness: number;

	constructor(x: number, height: number, width: number, brightness: number) {
		this.x = x;
		this.height = height;
		this.width = width;
		this.brightness = brightness;
	}

	public draw(canvasContext: CanvasRenderingContext2D): void {
		const canvasHeight = canvasContext.canvas.clientHeight;
		const whiteScale = 255 * this.brightness;

		canvasContext.beginPath();
		canvasContext.fillStyle = `rgb(${whiteScale}, ${whiteScale}, ${whiteScale})`;
		canvasContext.fillRect(this.x, canvasHeight / 2 - this.height / 2, this.width, this.height);
	}
}