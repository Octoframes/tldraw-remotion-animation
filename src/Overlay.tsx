import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Tldraw, createShapeId} from 'tldraw';
import '@tldraw/tldraw/tldraw.css';

export const Overlay: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const handleMount = (editor) => {
		const rectangleId = createShapeId('rectangle');

		editor.createShapes([
			{
				id: rectangleId,
				type: 'geo',
				x: 300,
				y: 300,
				props: {
					geo: 'rectangle',
					w: 150,
					h: 75,
					dash: 'draw',
					color: 'blue',
					size: 'm',
				},
			},
		]);
	};

	const moveToLeft = interpolate(frame, [0, durationInFrames], [0, -1000], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'fixed',
					inset: 0,
					transform: `translateX(${moveToLeft}px)`,
				}}
			>
				<Tldraw onMount={handleMount}></Tldraw>
			</div>
		</AbsoluteFill>
	);
};
