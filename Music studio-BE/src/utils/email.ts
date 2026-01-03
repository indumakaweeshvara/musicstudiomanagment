import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (subject: string, message: string) => {
  try {
    // 1. Transporter එක හදමු (Gmail හරහා යවන්න)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // .env එකේ තියෙන Email එක
        pass: process.env.EMAIL_PASS, // .env එකේ තියෙන App Password එක
      },
    });

    // 2. Email එකේ විස්තර
    const mailOptions = {
      from: `"Music Studio" <${process.env.EMAIL_USER}>`, // යවන කෙනා
      to: process.env.EMAIL_USER, // ලැබෙන්න ඕන කෙනා (ඔයාටමයි එන්නේ)
      subject: subject,
      text: message, // Text version
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #333;">${subject}</h2>
              <div style="font-size: 16px; color: #555; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #888;">Music Studio Notification System</p>
             </div>`,
    };

    // 3. යවන්න
    await transporter.sendMail(mailOptions);
    console.log(' Email sent successfully!');
    
  } catch (error) {
    console.error(' Email sending failed:', error);
    // Email යවන්න බැරි වුනා කියලා මුළු System එකම නවත්තන්න ඕන නැති නිසා Error එක throw කරන්නේ නෑ.
    // අවශ්‍ය නම් 'throw error;' කියලා දාන්න පුළුවන්.
  }
};