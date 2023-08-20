import { AbsoluteFill, interpolate,spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { TDShapeType, Tldraw, TldrawApp } from '@tldraw/tldraw';

const disappearBeforeEnd = 20;

export const Overlay: React.FC = () => {
	const [app, setApp] = React.useState<TldrawApp | null>(null);

	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const manipulateshape = spring({
		fps,
		from: 0,
		to: 100,
		frame: frame,
		config: {
			mass: 0.5,
		},
		durationInFrames: 40,
	});

	const handleMount = React.useCallback((app: TldrawApp) => {
		setApp(app);
	}, []);

	React.useEffect(() => {
		if (app) {
			app.createShapes({
				id: 'rect1',
				type: TDShapeType.Rectangle,
				point: [100, 100 + 0.5 * manipulateshape],
				size: [400 - manipulateshape, 100 + manipulateshape],
			});
		}
	}, [manipulateshape, app]);

	const out = spring({
		fps,
		frame: frame - durationInFrames + disappearBeforeEnd,
		config: {
			damping: 200,
		},
		durationInFrames: disappearBeforeEnd,
	});

	const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
	const outY = interpolate(out, [0, 1], [0, -100]);

	const container: React.CSSProperties = useMemo(() => {
		return {
			position: 'absolute',
			backgroundColor: 'white',
			borderRadius: 0,
			width: 600,
			height: 400,
			left: 400,
			top: 400,
			transform: `translate(0, ${outY}px) rotate(${rotate}rad) scale(2)`,
		};
	}, [outY, rotate]);

	return (
		<AbsoluteFill>
			<div style={container}>
				<Tldraw onMount={handleMount} />
			</div>
		</AbsoluteFill>
	);
};
