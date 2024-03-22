import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

export const Overlay: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Calculate the X position based on the current frame
	// This will move the Tldraw component from 0 (original position) to -1000 pixels to the left
	// Adjust the 'from' and 'to' values as needed for your animation
	const moveToLeft = interpolate(frame, [0, durationInFrames], [0, -1000], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<div style={{ position: 'fixed', inset: 0, transform: `translateX(${moveToLeft}px)` }}>
				<Tldraw />
			</div>
		</AbsoluteFill>
	);
};
