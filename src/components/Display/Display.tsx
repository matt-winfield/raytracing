import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Drawable } from "../../classes/interfaces/Drawable";
import "./Display.scss";

type DisplayProps = {
	width: number,
	height: number,
	drawables: Drawable[]
}

const Display: FunctionComponent<DisplayProps> = (props: DisplayProps) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>();

	useEffect(() => {
		if (!canvas || !canvas.current) return;

		const currentContext = canvas.current.getContext("2d");
		if (currentContext) {
			setCanvasContext(currentContext);
		}
	}, [])

	useEffect(() => {
		if (!canvasContext) return;

		canvasContext.clearRect(0, 0, props.width, props.height);

		canvasContext.fillStyle = "black";
		canvasContext.beginPath();
		canvasContext.fillRect(0, 0, props.width, props.height);

		for (const drawable of props.drawables) {
			drawable.draw(canvasContext);
		}
	}, [canvasContext, props.width, props.height, props.drawables])

	return <canvas className="canvas" width={props.width} height={props.height} ref={canvas}></canvas>
}

export default Display;