import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <Link href="/" className="logo" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <svg
                    className="logo-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Ketchup bottle cap */}
                    <rect
                        x="9"
                        y="3"
                        width="6"
                        height="3"
                        rx="1"
                        fill="currentColor"
                    />
                    {/* Bottle neck */}
                    <path
                        d="M10 6 L10 8 L14 8 L14 6"
                        fill="currentColor"
                    />
                    {/* Main bottle body */}
                    <path
                        d="M9 8 C9 8 8 9 8 10 L8 19 C8 20 9 21 10 21 L14 21 C15 21 16 20 16 19 L16 10 C16 9 15 8 15 8 Z"
                        fill="currentColor"
                    />
                    {/* Highlight/shine effect */}
                    <ellipse
                        cx="11.5"
                        cy="13"
                        rx="1"
                        ry="2.5"
                        fill="white"
                        opacity="0.3"
                    />
                </svg>
                <span>WholeKetchup</span>
            </Link>
        </header>
    );
}
