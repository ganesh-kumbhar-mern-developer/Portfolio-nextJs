import { sendEmail } from "@/lib/emailConfig";

export async function POST(req) {
  try {
    const body = await req.json();

    const { fullName, email, mobNo, city, msg } = body;

    // ✅ Validation
    if (!fullName || !email || !mobNo || !city || !msg) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString();

    const formData = {
      "Full Name": fullName,
      Email: email,
      "Mobile Number": mobNo,
      City: city,
      Message: msg,
    };

    // =========================
    // 🎨 ADMIN EMAIL TEMPLATE
    // =========================
    const adminEmailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <div style="background:#0f172a; color:#ffffff; padding:15px;">
            <h2 style="margin:0;">📩 New Contact Inquiry</h2>
          </div>

          <div style="padding:20px;">
            <p>You received a new message from your portfolio:</p>

            <table style="width:100%; border-collapse:collapse; margin-top:10px;">
              ${Object.entries(formData)
        .map(
          ([key, value]) => `
                  <tr>
                    <td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#f9fafb;">
                      ${key}
                    </td>
                    <td style="padding:10px; border:1px solid #ddd;">
                      ${value}
                    </td>
                  </tr>`
        )
        .join("")}
            </table>

            <p style="margin-top:20px; font-size:12px; color:#666;">
              Received on: ${timestamp}
            </p>
          </div>
        </div>
      </div>
    `;

    // =========================
    // 🙌 USER EMAIL TEMPLATE
    // =========================
    const userEmailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; text-align:center;">
          
          <div style="background:#2563eb; color:#ffffff; padding:20px;">
            <h2 style="margin:0;">Thank You 🙌</h2>
          </div>

          <div style="padding:20px;">
            <h3>Hi ${fullName},</h3>
            
            <p>
              Thank you for reaching out through my portfolio.
              I’ve received your message and will get back to you shortly.
            </p>

            <p style="margin-top:20px;">
              🚀 Looking forward to connecting with you!
            </p>

            <div style="margin-top:30px;">
              <p style="margin:0;">Best regards,</p>
              <strong>Ganesh Kumbhar</strong>
            </div>
          </div>

          <div style="background:#f1f5f9; padding:10px; font-size:12px; color:#666;">
            This is an automated response. Please do not reply.
          </div>

        </div>
      </div>
    `;

    // =========================
    // 📩 SEND ADMIN EMAIL
    // =========================
    await sendEmail({
      to: process.env.EMAIL_USER, // your email
      subject: `New Contact Form | ${timestamp}`,
      html: adminEmailHTML,
    });

    // =========================
    // 🙌 SEND USER EMAIL
    // =========================
    await sendEmail({
      to: email,
      subject: `Thanks for contacting | ${timestamp}`,
      html: userEmailHTML,
    });

    return Response.json({ message: "✅ Emails sent successfully!" });

  } catch (error) {
    console.error("❌ API Error:", error);

    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}