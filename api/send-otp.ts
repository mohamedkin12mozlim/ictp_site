import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {

    const email = req.body.email
  .trim()
  .toLowerCase();

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // وقت الانتهاء بعد 10 دقائق
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 10);

    const expiryTime = expiryDate.toISOString();

    // تخزين الكود
    const { error: dbError } = await supabase
      .from("email_verifications")
      .upsert({
        email,
        otp,
        expires_at: expiryTime
      });

    if (dbError) {
      throw dbError;
    }

    // إرسال الإيميل
    await resend.emails.send({

      from:"noreply@ictpgate.com",

      to: email,

      subject: "كود التحقق",

      html: `
      <div style="font-family:Arial;text-align:center">

        <h2>كود التحقق الخاص بك</h2>

        <div style="
          font-size:35px;
          font-weight:bold;
          letter-spacing:8px;
          padding:20px;
          background:#f3f3f3;
          border-radius:12px;
          display:inline-block;
        ">

          ${otp}

        </div>

        <p>الكود صالح لمدة 10 دقائق</p>

      </div>
      `
    });

    return res.status(200).json({
      success: true
    });

  } catch (err: any) {

    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}