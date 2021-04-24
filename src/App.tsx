import { useEffect, useRef, useState } from 'react';
import { timer } from 'd3-timer';
import './App.scss';
import { Drawable } from './classes/interfaces/Drawable';
import { Camera } from './classes/Camera';
import { Wall } from './classes/Wall';
import Display from './components/Display/Display';

const displayWidth = (window.innerWidth - 15) / 2;
const displayHeight = 500;

const fov = 60;
const cameraResolution = 500;

const walls: Wall[] = [];
const camera = new Camera(displayWidth / 2, displayHeight / 2, 0, fov, Math.max(displayWidth, displayHeight), cameraResolution, walls);
const pressedKeys: string[] = [];

function App(): JSX.Element {
	const [xDirection] = useState(1);
	const [yDirection] = useState(1);
	const [overheadDrawables, setOverheadDrawables] = useState<Drawable[]>([camera]);
	const [povDrawables, setPovDrawables] = useState<Drawable[]>([]);

	const xDirectionRef = useRef(xDirection);
	xDirectionRef.current = xDirection;

	const yDirectionRef = useRef(yDirection);
	yDirectionRef.current = yDirection;

	const overheadDrawablesRef = useRef(overheadDrawables);
	overheadDrawablesRef.current = overheadDrawables;

	const povDrawablesRef = useRef(povDrawables);
	povDrawablesRef.current = povDrawables;

	const tick = () => {

		if (pressedKeys.includes("ArrowLeft") || pressedKeys.includes("a")) {
			camera.moveSide(-1);
		}
		if (pressedKeys.includes("ArrowRight") || pressedKeys.includes("d")) {
			camera.moveSide(1);
		}
		if (pressedKeys.includes("ArrowUp") || pressedKeys.includes("w")) {
			camera.moveForward(1)
		}
		if (pressedKeys.includes("ArrowDown") || pressedKeys.includes("s")) {
			camera.moveForward(-1);
		}
		if (pressedKeys.includes("q")) {
			camera.rotate(-1);
		}
		if (pressedKeys.includes("e")) {
			camera.rotate(1);
		}

		setOverheadDrawables([...overheadDrawablesRef.current]);
		setPovDrawables(camera.getScene(displayWidth, displayHeight));
	}

	useEffect(() => {
		walls.push(
			new Wall(0, 0, displayWidth, 0),
			new Wall(0, 0, 0, displayHeight),
			new Wall(displayWidth, 0, displayWidth, displayHeight),
			new Wall(0, displayHeight, displayWidth, displayHeight)
		);

		for (let i = 0; i < 5; i++) {
			const x1 = Math.random() * displayWidth;
			const y1 = Math.random() * displayHeight;
			const x2 = Math.random() * displayWidth;
			const y2 = Math.random() * displayHeight;

			walls.push(new Wall(x1, y1, x2, y2));
		}
		setOverheadDrawables(drawables => [...drawables, ...walls]);

		document.addEventListener('keydown', event => {
			pressedKeys.push(event.key);
		});
		document.addEventListener('keyup', event => {
			let index = pressedKeys.indexOf(event.key);
			while (index !== -1) {
				pressedKeys.splice(index, 1);
				index = pressedKeys.indexOf(event.key);
			}
		});
	}, [])

	useEffect(() => {
		const t = timer(() => tick());
		return () => t.stop();
	}, [])

	return (
		<div className="App">
			<Display width={displayWidth} height={displayHeight} drawables={overheadDrawables}></Display>
			<Display width={displayWidth} height={displayHeight} drawables={povDrawables}></Display>
		</div>
	);
}

export default App;
