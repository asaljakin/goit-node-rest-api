import sgMail from "@sendgrid/mail";
import HttpError from "./HttpError.js";

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: SENDGRID_EMAIL };
  console.log("msg: ", msg);
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      throw HttpError(500, "Failed to send verification email");
    });
};

export default sendEmail;
