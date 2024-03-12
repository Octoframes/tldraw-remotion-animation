import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import React, {useMemo} from 'react';
import {loadFont} from '@remotion/google-fonts/Roboto';
import {Tldraw, useEditor} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

export const Overlay: React.FC = () => {
	return (
		<AbsoluteFill>
			<div style={{position: 'fixed', inset: 0}}>
				<Tldraw />
			</div>
		</AbsoluteFill>
	);
};
