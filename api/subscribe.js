import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_TO = process.env.EMAIL_TO || 'info@linearmarketingsolutions.com';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Please enter your email address.'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please enter a valid email address.'
            });
        }

        // Send notification email
        const { data, error } = await resend.emails.send({
            from: 'Linear Marketing Solutions <onboarding@resend.dev>',
            to: [EMAIL_TO],
            subject: 'New Email Subscriber',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">New Email Subscriber</h2>
                    <p style="font-size: 16px;">Someone has subscribed via the website:</p>
                    <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-top: 16px;">
                        <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
                    </div>
                    <p style="margin-top: 20px; color: #666; font-size: 12px;">
                        Captured from the hero section email form.
                    </p>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to subscribe. Please try again.'
            });
        }

        console.log('Subscription email sent:', data);
        return res.status(200).json({
            success: true,
            message: 'Thanks! We\'ll be in touch soon.'
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred. Please try again later.'
        });
    }
}
