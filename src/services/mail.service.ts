import nodemailer from "nodemailer";

export class MailService {
    private transporter;

    constructor () {
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    }
    async sendPasswordReset(email: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"Soporte Rukanas" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <h3>Hola, </h3>
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Este enlace expira en 15 minutos.</p>
      `,
    });
  }
}
