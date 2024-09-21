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
      html: `
        <div style="background-color: #f0f0f0; padding: 20px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto;">
            <tr>
              <td align="center" style="padding: 10px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: white; padding: 20px; text-align: center;">
                  <tr>
                    <td>
                      <h1 style="color: #483CE8;">Vérification de mail !</h1>
                      <p style="color: #555;">Voici votre code d'activation :</p>
                      <p style="font-size: 14px; background-color: #f0f0f0; padding: 10px; border-radius: 5px;width: auto;display:flex; justify-content:center;">
                          <strong>${verificationCode}</strong>
                        </p>
                      <button style="padding: 10px 20px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Rejoindre le site 
                      </button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    };


    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès à', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw new Error('L\'e-mail n\'a pas pu être envoyé.');
  }
};
