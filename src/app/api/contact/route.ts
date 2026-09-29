import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // In a production backend, this would trigger an email via Resend/SendGrid or save to a DB
    // e.g. await resend.emails.send({ from: 'concierge@vipasi.in', to: 'admin@vipasi.in', ... });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out to VIPASI Atelier. Our concierge will contact you within 24 hours.',
      data: {
        name,
        email,
        mobile: mobile || 'Not provided',
        receivedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
