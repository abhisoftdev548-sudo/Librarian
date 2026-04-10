import { transporter } from "../config/mailConfig.js";

export const sendEmailOtp = async (toEmail,subject,  message, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"BT-Notes" <btnotes321@gmail.com>',
      to: toEmail,
      subject: subject,
      text: message,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
