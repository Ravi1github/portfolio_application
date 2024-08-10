const nodemailer = require("nodemailer");
require("dotenv").config();

//transport
const transporter = nodemailer.createTransport({
  service:'gmail',
  host:'smtp.gmail.com',
  port: 587,
  auth: {
      user: process.env.USER,
      pass:process.env.PASS 
  }
});
const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;
    console.log(name,email,msg);
    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //email matter
    transporter.sendMail({
      to: process.env.USER,
      from: `<${email}>`,
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
