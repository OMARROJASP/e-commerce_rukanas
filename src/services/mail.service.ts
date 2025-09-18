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

  async sendReviewRequest(email: string, orderId: number) {
  await this.transporter.sendMail({
    to: email,
    subject: "¡Tu pedido fue completado! 🎉",
    html: `
      <p>Hola, tu pedido #${orderId} fue completado con éxito.</p>
      <p>¿Nos ayudas dejando un comentario de los productos que compraste?</p>
      <a href="${process.env.FRONTEND_URL}/review/${orderId}">
        Dejar comentario
      </a>
    `
  });
}

}
