'use client';

import { useState, DragEvent, ChangeEvent } from 'react';

interface UploadZoneProps {
    onImageUpload: (file: File) => void;
    isLoading: boolean;
}

export default function UploadZone({ onImageUpload, isLoading }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, or WebP)');
            return;
        }

        onImageUpload(file);
    };

    return (
        <div
            className={`upload-zone business-card-elevated ${isDragging ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isLoading && document.getElementById('file-input')?.click()}
        >
            <input
                id="file-input"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInput}
                style={{ display: 'none' }}
                disabled={isLoading}
            />

            <svg
                className="upload-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17 8L12 3L7 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 3V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: 'var(--text-primary)'
            }}>
                Upload Your Image
            </h2>

            <p style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
            }}>
                Drag and drop or click to browse
            </p>

            <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-light)'
            }}>
                Supports JPG, PNG, WebP
            </p>
        </div>
    );
}
