import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Apple touch icon generation
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    background: '#FF6B35',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                }}
            >
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 4C12 4 10 4 10 6C10 8 12 8 12 8C12 8 14 8 14 6C14 4 12 4 12 4Z"
                        fill="white"
                        strokeWidth="0.5"
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
