import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import React, {useMemo} from 'react';
import {loadFont} from '@remotion/google-fonts/Roboto';
import { Tldraw } from "@tldraw/tldraw";



const {fontFamily} = loadFont();

const title: React.CSSProperties = {
	fontFamily,
	fontSize: 80,
	fontWeight: 'bold',
};

const text: React.CSSProperties = {
	fontWeight: 'bold',
	fontFamily,
	fontSize: 40,
	color: '#4290F5',
};

const disappearBeforeEnd = 20;

export const Overlay: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const scale = spring({
		fps,
		frame,
		config: {
			mass: 0.5,
		},
	});


	const out = spring({
		fps,
		frame: frame - durationInFrames + disappearBeforeEnd,
		config: {
			damping: 200,
		},
		durationInFrames: disappearBeforeEnd,
	});

	const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
	const outY = interpolate(out, [0, 1], [0, -1300]);


	console.log(outY)

	const container: React.CSSProperties = useMemo(() => {
		return {
			position: 'absolute',
			backgroundColor: 'white',
			borderRadius: 0,
			width: 600,
			height : 400,
			left: 400,
			top: 400,
			scale: String(scale*2),
			translate: `0 ${outY}px`,
			rotate: `${rotate}rad`,
		};
	}, [scale, outY, rotate]);

	return (
		<AbsoluteFill>
			<div style={container}>
			<Tldraw />
				{/* <div style={title}>Look</div> */}
				{/* <div style={text}>I'm an overlay!</div> */}

			</div>
		</AbsoluteFill>
	);
};

