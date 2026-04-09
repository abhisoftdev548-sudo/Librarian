import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: process.env.BREVO_PORT,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
})