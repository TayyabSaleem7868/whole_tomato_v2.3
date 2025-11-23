'use client';

import { useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface ImageComparisonProps {
    originalImage: string;
    processedImage: string;
    onDownload: () => void;
    onReset: () => void;
}

export default function ImageComparison({
    originalImage,
    processedImage,
    onDownload,
    onReset
}: ImageComparisonProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const updateSliderPosition = (clientX: number) => {
        if (!containerRef.current || !sliderRef.current || !overlayRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        // Direct DOM updates - no React re-renders!
        sliderRef.current.style.left = `${percentage}%`;
        overlayRef.current.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        isDraggingRef.current = true;
        updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;
        e.preventDefault();
        updateSliderPosition(e.clientX);
    };

    return (
        <div className="fade-in" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', userSelect: 'none' }}>
            <div
                ref={containerRef}
                className="comparison-container"
                style={{
                    position: 'relative',
                    cursor: isDraggingRef.current ? 'ew-resize' : 'default',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
            >
                {/* Processed Image (Background) */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image
                        src={processedImage}
                        alt="Processed"
                        fill
                        style={{ objectFit: 'contain', pointerEvents: 'none' }}
                        priority
                        draggable={false}
                    />
                </div>

                {/* Original Image (Overlay with clip) */}
                <div
                    ref={overlayRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        clipPath: 'inset(0 50% 0 0)',
                        pointerEvents: 'none'
                    }}
                >
                    <Image
                        src={originalImage}
                        alt="Original"
                        fill
                        style={{ objectFit: 'contain', pointerEvents: 'none' }}
                        priority
                        draggable={false}
                    />
                </div>

                {/* Slider */}
                <div
                    ref={sliderRef}
                    className="comparison-slider"
                    style={{ left: '50%' }}
                >
                    <div className="slider-handle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Labels */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'var(--color-white)',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-md)',
                    userSelect: 'none',
                    pointerEvents: 'none'
                }}>
                    Before
                </div>
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--color-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'white',
                    boxShadow: 'var(--shadow-md)',
                    userSelect: 'none',
                    pointerEvents: 'none'
                }}>
                    After
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <button className="btn-primary" onClick={onDownload}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download Image
                </button>
                <button className="btn-secondary" onClick={onReset}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Upload Another
                </button>
            </div>
        </div>
    );
}
