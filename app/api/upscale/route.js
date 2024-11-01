import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const response = await fetch('https://api.claid.ai/v1-beta1/image/edit/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLAID_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error_message || 'Failed to process image' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}