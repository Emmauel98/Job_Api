import transporter from "../config/email";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

interface EmailPayload {
  to: string;
  subject: string;
  template: string;
  variables: Record<string, any>;
}

export const sendEmail = async ({
  to,
  subject,
  template,
  variables,
}: EmailPayload) => {
  try {
    const templatePath = path.join(__dirname, "..", "templates", template);
    const source = fs.readFileSync(templatePath, "utf8");
    const compiled = handlebars.compile(source);
    const html = compiled(variables);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${to}`);
  } catch (err) {
    console.error("Email send error:", err);
  }
};
