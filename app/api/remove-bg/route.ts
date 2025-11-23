import { NextRequest, NextResponse } from 'next/server';
import { removeBackgroundFromImageBase64 } from 'remove.bg';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No image file provided' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString('base64');

        // Get API key from environment
        const apiKey = process.env.NEXT_PUBLIC_REMOVEBG_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }
        const result = await removeBackgroundFromImageBase64({
            base64img: base64Image,
            apiKey: apiKey,
            size: 'full', // Use full resolution instead of auto
            type: 'auto',
            format: 'png',
        });

        // Return the processed image as base64
        return NextResponse.json({
            success: true,
            image: `data:image/png;base64,${result.base64img}`,
        });

    } catch (error: any) {
        console.error('Background removal error:', error);

        // Handle specific remove.bg errors
        // The error might be an array of errors or an object with an errors property
        const errors = Array.isArray(error) ? error : error.errors;

        if (errors && errors.length > 0) {
            const firstError = errors[0];
            const errorMessage = firstError.title || firstError.detail || 'Unknown error occurred';
            return NextResponse.json(
                { error: errorMessage },
                { status: error.statusCode || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to process image. Please try again.' },
            { status: 500 }
        );
    }
}
