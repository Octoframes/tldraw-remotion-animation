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

    const rectangleId1 = createShapeId("rectangle1");
    const rectangleId2 = createShapeId("rectangle2");
    const arrowId = createShapeId("arrow");
		editor.createShapes([
      {
        id: rectangleId1,
        type: "geo",
        x: 300,
        y: 300,
        props: {
          geo: "rectangle",
          w: 150,
          h: 75,
          dash: "draw",
          color: "blue",
          size: "xl",
        },
      },
      {
        id: rectangleId2,
        type: "geo",
        x: 500,
        y: 500,
        props: {
          geo: "rectangle",
          w: 100,
          h: 100,
          dash: "draw",
          color: "yellow",
          size: "m",
        },
      },
      {
        id: arrowId,
        type: "arrow",
        props: {
          start: {
            type: "binding",
            boundShapeId: rectangleId1,
            normalizedAnchor: { x: 0.5, y: 0.5 },
            isExact: false,
            isPrecise: true,
          },
          end: {
            type: "binding",
            boundShapeId: rectangleId2,
            normalizedAnchor: { x: 0.5, y: 0.5 },
            isExact: false,
            isPrecise: true,
          },
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
					id: createShapeId('rectangle1'),
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