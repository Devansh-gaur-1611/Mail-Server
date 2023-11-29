const SibApiV3Sdk = require("sib-api-v3-sdk");
const fs = require("fs");
const Joi = require("joi");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const senderMail = process.env.EMAIL_SENDER;

const Mail = {
  async sendMailVerify(req, res, next) {
    const mailSchema = Joi.object({
      email: Joi.string().required(),
      subject: Joi.string().required(),
      username: Joi.string().required(),
      otp: Joi.number().required(),
      company: Joi.string().required(),
    });

    const { error } = mailSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const sender = {
      email: senderMail,
      name: req.body.company,
    };

    const receivers = [
      {
        email: req.body.email,
      },
    ];

    let html = fs.readFileSync("./templates/mail-verify.html", "utf8");
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{userName}}", req.body.username);
    html = html.replace("{{code}}", req.body.otp);
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{email}}", senderMail);

    try {
      apiInstance
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: req.body.subject,
          htmlContent: html,
        })
        .then((response) => {
          res.status(200).json({ message: "Mail sent successfully" });
        });
    } catch (error) {
      console.log("Error occured");
      res.status(500).json({ error: error.message });
    }
  },
  async sendMailSuccess(req, res, next) {
    const mailSchema = Joi.object({
      email: Joi.string().required(),
      subject: Joi.string().required(),
      username: Joi.string().required(),
      company: Joi.string().required(),
    });

    const { error } = mailSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const sender = {
      email: senderMail,
      name: req.body.company,
    };

    const receivers = [
      {
        email: req.body.email,
      },
    ];

    let html = fs.readFileSync("./templates/success.html", "utf8");
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{userName}}", req.body.username);
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{email}}", senderMail);

    try {
      apiInstance
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: req.body.subject,
          htmlContent: html,
        })
        .then((response) => {
          res.status(200).json({ message: "Mail sent successfully" });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  },
  async sendMailPassword(req, res, next){
    const mailSchema = Joi.object({
      email: Joi.string().required(),
      subject: Joi.string().required(),
      username: Joi.string().required(),
      otp: Joi.number().required(),
      company: Joi.string().required()
    });
  
    const { error } = mailSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const sender = {
      email: senderMail,
      name: req.body.company,
    };
  
    const receivers = [
      {
        email: req.body.email,
      },
    ];
  
    let html = fs.readFileSync("./templates/password-reset.html", "utf8");
    html = html.replace("{{company}}", req.body.company);
    html = html.replace("{{userName}}", req.body.username);
    html = html.replace("{{code}}", req.body.otp);
    html = html.replace("{{company}}", req.body.company);
  
    try {
      apiInstance
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: req.body.subject,
          htmlContent: html,
        })
        .then((response) => {
          res.status(200).json({ message: "Mail sent successfully" });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  },
  async sendMailAttendance(req, res, next) {
    const mailSchema = Joi.object({
      email: Joi.string().required(),
      subject: Joi.string().required(),
      username: Joi.string().required(),
      course: Joi.string().required(),
      adminName: Joi.string().required(),
    });
  
    const { error } = mailSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const sender = {
      email: senderMail,
      name: req.body.adminName,
    };
  
    const receivers = [
      {
        email: req.body.email,
      },
    ];
  
    let html = fs.readFileSync("./templates/short-attendance.html", "utf8");
    html = html.replace("{{username}}", req.body.username);
    html = html.replace("{{adminName}}", req.body.adminName);
    html = html.replace("{{subject}}", req.body.course);
  
    try {
      apiInstance
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: req.body.subject,
          htmlContent: html,
        })
        .then((response) => {
          res.status(200).json({ message: "Mail sent successfully" });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = Mail;
