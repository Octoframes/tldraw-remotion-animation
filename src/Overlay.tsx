import React, {useState, useEffect} from 'react';
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
	const [editorInstance, setEditorInstance] = useState(null);

	const handleMount = (editor) => {
		setEditorInstance(editor); // Store the editor instance for later use

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
					size: 'xl',
				},
			},
		]);
	};

	const xCoordinate = interpolate(frame, [0, durationInFrames], [0, 1000], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	useEffect(() => {
		if (editorInstance) {
			editorInstance.updateShapes([
				{
					id: createShapeId('rectangle'),
					x: xCoordinate,
				},
			]);
		}
	}, [xCoordinate, editorInstance]);

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'fixed',
					inset: 0,
					// transform: `translateX(${xCoordinate}px)`,
				}}
			>
				<Tldraw onMount={handleMount}></Tldraw>
			</div>
		</AbsoluteFill>
	);
};