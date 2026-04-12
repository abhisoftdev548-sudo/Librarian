import crypto from "crypto";

export const generateOtp = () =>  {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Generates an HTML string for an OTP to be sent via email.
 * @param {string} otp The OTP to be included in the HTML string.
 * @returns {string} The HTML string containing the OTP.
 */
/*******  5287ae58-54c9-458f-aeae-030d1d7ea1d2  *******/  
export const generateHtmlOtp = (otp: string) => {
    return `<p style="font-family:Arial, sans-serif; color:#333; font-size:14px;">
  Hi there,<br><br>

  Your OTP for <strong>BT-Notes</strong> is:<br><br>

  <span style="
    display:inline-block;
    font-size:20px;
    font-weight:bold;
    letter-spacing:4px;
    color:#2b6cff;
    background:#f0f4ff;
    padding:8px 16px;
    border-radius:6px;
    latter-spacing: 4px;
  ">
    ${otp}
  </span>
  <br><br>

  It is valid for <strong>10 minutes</strong>.<br><br>

  If you did not request this, please ignore this email.
</p>`;
}

export const generateHtmlResetPassword = (token: string) => {
    return `<p style="font-family:Arial, sans-serif; color:#333; font-size:14px;">
  Hi there,<br><br>

  Aapne password reset request ki hai. Naya password banane ke liye niche diye gaye link par click karein (Valid for 15 min):<br><br>

  <a href="http://localhost:5173/reset-password/${token}" style="
    display:inline-block; 
    font-size:20px;
    font-weight:bold;
    letter-spacing:4px;
    color:#2b6cff;
    background:#f0f4ff;
    padding:8px 16px;
    border-radius:6px;
  ">Reset Password</a>
  <br><br>

  If you did not request this, please ignore this email.
</p>`;
}