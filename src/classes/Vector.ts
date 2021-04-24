export class Vector {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public add(vector: Vector): Vector {
		let x = this.x + vector.x;
		let y = this.y + vector.y;
		return new Vector(x, y);
	}

	public mutateAdd(vector: Vector): void {
		this.x += vector.x;
		this.y += vector.y;
	}

	public multiply(value: number): Vector {
		let x = this.x * value;
		let y = this.y * value;
		return new Vector(x, y);
	}

	public distanceTo(point: Vector): number {
		return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
	}

	public static fromAngle(angle: number) {
		let x = Math.sin(this.toRadians(angle));
		let y = -Math.cos(this.toRadians(angle));
		return new Vector(x, y);
	}

	private static toRadians(degrees: number) {
		return degrees * (Math.PI / 180);
	}
}