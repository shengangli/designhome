import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Change this to your email address where you want to receive leads
const OWNER_EMAIL = 'dustinli0608@gmail.com'; // <-- CHANGE THIS TO YOUR EMAIL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, projectType, services, languages, timeline, estimatedPrice } = body;

    if (!email || !projectType || !services || !languages || !timeline || !estimatedPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content to send to you (the owner) with lead information
    const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; font-weight: 300; font-size: 28px; margin-bottom: 30px;">🎯 New Lead from Pricing Calculator</h2>
      
      <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 30px;">
        <h3 style="color: #0c4a6e; margin: 0 0 10px 0;">Contact Information</h3>
        <p style="margin: 0; color: #475569; font-size: 18px;">
          <strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a>
        </p>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 48px; font-weight: 300; color: #000; margin-bottom: 10px;">
            $${estimatedPrice.toLocaleString()}
          </div>
          <div style="color: #666; font-size: 16px;">Estimated Project Value</div>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="color: #333; font-weight: 500; margin-bottom: 20px;">Project Requirements</h3>
        
        <div style="background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
          <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6;">
            <strong style="color: #333;">Project Type:</strong>
            <span style="color: #666; margin-left: 10px;">${projectType}</span>
          </div>
          
          <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6;">
            <strong style="color: #333;">Services Requested:</strong>
            <span style="color: #666; margin-left: 10px;">${services.join(', ')}</span>
          </div>
          
          <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6;">
            <strong style="color: #333;">Language Support:</strong>
            <span style="color: #666; margin-left: 10px;">${languages.join(', ')}</span>
          </div>
          
          <div style="margin-bottom: 0;">
            <strong style="color: #333;">Timeline:</strong>
            <span style="color: #666; margin-left: 10px;">${timeline}</span>
          </div>
        </div>
      </div>

      <div style="background: #10b981; color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
        <h3 style="margin: 0 0 10px 0; font-weight: 400;">Next Steps</h3>
        <p style="margin: 0; opacity: 0.95;">Contact this lead within 24 hours for best conversion rates</p>
      </div>

      <div style="color: #999; font-size: 12px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
        <p>Lead generated on ${new Date().toLocaleString()}</p>
        <p style="margin: 5px 0 0 0;">From: Pricing Calculator - Homepage</p>
      </div>
    </div>
    `;

    // Send email to you (the owner) with lead information
    const data = await resend.emails.send({
      from: 'Lead Notification <onboarding@resend.dev>',
      to: [OWNER_EMAIL], // Sends to your email
      subject: `💰 New Lead: ${email} - $${estimatedPrice.toLocaleString()} Psuroject`,
      html: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}