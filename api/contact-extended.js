import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_TO = process.env.EMAIL_TO || 'info@linearmarketingsolutions.com';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, company, position, challenges, goals, additional } = req.body;

        // Validate required fields
        if (!name || !email || !company || !position || !challenges || !goals) {
            return res.status(400).json({
                success: false,
                error: 'Please fill in all required fields.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please enter a valid email address.'
            });
        }

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Linear Marketing Solutions <onboarding@resend.dev>',
            to: [EMAIL_TO],
            replyTo: email,
            subject: `New Detailed Inquiry from ${name} at ${company}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                        New Detailed Contact Form Submission
                    </h2>
                    
                    <h3 style="color: #1a1a1a; margin-top: 24px;">Contact Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold; width: 140px; border: 1px solid #e8e8e8;">Name</td>
                            <td style="padding: 12px; border: 1px solid #e8e8e8;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold; border: 1px solid #e8e8e8;">Email</td>
                            <td style="padding: 12px; border: 1px solid #e8e8e8;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold; border: 1px solid #e8e8e8;">Phone</td>
                            <td style="padding: 12px; border: 1px solid #e8e8e8;">${phone || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold; border: 1px solid #e8e8e8;">Company</td>
                            <td style="padding: 12px; border: 1px solid #e8e8e8;">${company}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: #f8f9fa; font-weight: bold; border: 1px solid #e8e8e8;">Position</td>
                            <td style="padding: 12px; border: 1px solid #e8e8e8;">${position}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 24px;">
                        <h3 style="color: #1a1a1a; margin-bottom: 12px;">Marketing Challenges</h3>
                        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #6366f1;">
                            ${challenges.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px;">
                        <h3 style="color: #1a1a1a; margin-bottom: 12px;">Primary Goals</h3>
                        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #a855f7;">
                            ${goals.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    ${additional ? `
                    <div style="margin-top: 24px;">
                        <h3 style="color: #1a1a1a; margin-bottom: 12px;">Additional Information</h3>
                        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #666;">
                            ${additional.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <p style="margin-top: 30px; color: #666; font-size: 12px;">
                        This message was sent from the Linear Marketing Solutions contact page.
                    </p>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to send message. Please try again or email us directly.'
            });
        }

        console.log('Email sent successfully:', data);
        return res.status(200).json({
            success: true,
            message: 'Thank you for reaching out! We\'ll respond within 24 hours.'
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred. Please try again later.'
        });
    }
}
