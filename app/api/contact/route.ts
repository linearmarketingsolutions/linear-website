import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const SERVICE_OPTIONS = [
  "Growth Engine (Marketing Strategy)",
  "Content Pipeline",
  "Web & App Development",
  "AI Infrastructure",
  "Business Operations",
  "AI Education & Training",
  "Multiple / Not sure yet",
] as const;

const BUDGET_OPTIONS = [
  "Under $2,500/mo",
  "$2,500 – $5,000/mo",
  "$5,000 – $10,000/mo",
  "$10,000+/mo",
  "Project-based (one-time)",
  "Let's discuss",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, website, service, budget, referral, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const lines = [
      `New inquiry from ${name}`,
      `${"─".repeat(40)}`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      website ? `Website: ${website}` : null,
      ``,
      service ? `Service Interest: ${service}` : null,
      budget ? `Budget Range: ${budget}` : null,
      referral ? `How they found us: ${referral}` : null,
      ``,
      `${"─".repeat(40)}`,
      `Message:`,
      ``,
      message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    const htmlLines = [
      `<h2 style="color:#7C3AED;margin:0 0 16px">New Inquiry from ${name}</h2>`,
      `<table style="border-collapse:collapse;width:100%;max-width:600px">`,
      row("Name", name),
      row("Email", `<a href="mailto:${email}">${email}</a>`),
      phone ? row("Phone", `<a href="tel:${phone}">${phone}</a>`) : null,
      company ? row("Company", company) : null,
      website ? row("Website", `<a href="${website}">${website}</a>`) : null,
      service ? row("Service Interest", service) : null,
      budget ? row("Budget Range", budget) : null,
      referral ? row("Referral Source", referral) : null,
      `</table>`,
      `<div style="margin-top:24px;padding:16px;background:#f4f4f5;border-radius:8px">`,
      `<p style="margin:0 0 8px;font-weight:600;color:#18181b">Message:</p>`,
      `<p style="margin:0;color:#3f3f46;white-space:pre-wrap">${escapeHtml(message)}</p>`,
      `</div>`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    await transporter.sendMail({
      from: `"LMS Website" <${process.env.GMAIL_USER}>`,
      to: [
        "info@linearmarketingsolutions.com",
      ],
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}${service ? ` — ${service}` : ""}`,
      text: lines,
      html: htmlLines,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px 8px 0;color:#71717a;font-size:14px;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0;color:#18181b;font-size:14px">${value}</td></tr>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
