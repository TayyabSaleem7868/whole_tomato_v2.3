export default function LoadingSpinner() {
    return (
        <div className="loading-container fade-in">
            <div className="spinner"></div>
            <p className="loading-text">Processing your image with AI...</p>
        </div>
    );
}
