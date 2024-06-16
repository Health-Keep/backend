import { createTransport } from "nodemailer";
import { emailJwt } from "../../../utils/emailJWT";
import ejs from "ejs"
import path from "path"

const forgotPasswordEmailService = async (email: string, user_id: string, name: string) => {
    const subject = `Reset Password | HealthKeep`
    const token = await emailJwt({id: user_id })
    const url = `${process.env.BASE_URL as string}/reset-password/token=${token}`
    const templatePath = path.join(__dirname, '../templates/resetPassword.ejs');
    const html = await ejs.renderFile(templatePath, {
    name: name,
    url: url,
    appName: 'HealthKeep',
    logo: 'https://res.cloudinary.com/dlf0nmmfy/image/upload/fl_preserve_transparency/v1718496928/health-keep-logo_sd3uqp.jpg?_s=public-apps'
    });
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
  }

  export { forgotPasswordEmailService }