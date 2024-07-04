import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: hashedToken,
        verificationTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET_PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
        from : "justharsh2407@gmail.com",
        to : email,
        subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>CLick <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

  } catch (err: any) {
    throw new Error(err.message);
  }
};
