'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import UploadZone from '@/components/UploadZone';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageComparison from '@/components/ImageComparison';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create preview of original image
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Send to API for background removal
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }

      setProcessedImage(data.image);
    } catch (err: any) {
      console.error('Error processing image:', err);
      setError(err.message || 'Failed to process image. Please try again.');
      setOriginalImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `wholeketchup-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
  };

  return (
    <div className="business-bg">
      <Header />

      <main className="container section">
        {/* Hero Section */}
        {!originalImage && !isLoading && (
          <div className="fade-in" style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              lineHeight: '1.2',
              color: 'var(--text-primary)',
            }}>
              Free Background Removal Tool
              <br />
              <span style={{ color: 'var(--color-primary)' }}>Powered by AI</span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              maxWidth: '650px',
              margin: '0 auto 2rem',
            }}>
              Remove backgrounds from any image instantly with our advanced AI technology.
              Fast, accurate, and professional results every time.
            </p>
          </div>
        )}

        {/* Main Content */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {error && (
            <div className="business-card fade-in" style={{
              padding: '1.5rem',
              marginBottom: '2rem',
              background: '#FEE2E2',
              borderColor: '#EF4444',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DC2626" strokeWidth="2" />
                  <path d="M12 8V12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1" fill="#DC2626" />
                </svg>
                <p style={{ color: '#DC2626', fontWeight: '600', margin: 0 }}>
                  {error}
                </p>
              </div>
              <button
                className="btn-secondary"
                onClick={handleReset}
                style={{ marginTop: '1rem' }}
              >
                Try Again
              </button>
            </div>
          )}

          {!originalImage && !isLoading && !error && (
            <UploadZone onImageUpload={handleImageUpload} isLoading={isLoading} />
          )}

          {isLoading && (
            <div className="business-card-elevated">
              <LoadingSpinner />
            </div>
          )}

          {originalImage && processedImage && !isLoading && (
            <ImageComparison
              originalImage={originalImage}
              processedImage={processedImage}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Features */}
        {!originalImage && !isLoading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '5rem',
            maxWidth: '1000px',
            margin: '5rem auto 0',
          }}>
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Lightning Fast',
                desc: 'Get your results in seconds with our optimized AI engine'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                title: 'AI Powered',
                desc: 'State-of-the-art machine learning for precise edge detection'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Professional Quality',
                desc: 'High-resolution output ready for commercial use'
              },
            ].map((feature, index) => (
              <div key={index} className="business-card feature-card fade-in" style={{
                animationDelay: `${index * 0.1}s`,
              }}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
