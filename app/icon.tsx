import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#FF6B35',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 4C12 4 10 4 10 6C10 8 12 8 12 8C12 8 14 8 14 6C14 4 12 4 12 4Z"
                        fill="white"
                    />
                    <path
                        d="M11 8H13V20C13 20 13 21 12 21C11 21 11 20 11 20V8Z"
                        fill="white"
                    />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
