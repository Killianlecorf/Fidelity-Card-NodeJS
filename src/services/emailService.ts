import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Vérifiez votre email',
      text: `Votre code de vérification est : ${verificationCode}`,
    };


    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès à', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw new Error('L\'e-mail n\'a pas pu être envoyé.');
  }
};
