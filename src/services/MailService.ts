import nodemailer from 'nodemailer';

// Configure the transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mhoanganh05@gmail.com', 
    pass: 'kkrx tuob ulad znmd',  
  },
});

// Email options
const mailOptions = (url : string,toMail: string) => { return {
  from: 'Conversa', 
  to: toMail, 
  subject: 'Xác nhận tài khoản Conversa của bạn', 
  text: '', 
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #506ae1;
              color: white;
              padding: 10px 0;
              text-align: center;
              border-radius: 10px 10px 0 0;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .content p {
              font-size: 16px;
              line-height: 1.5;
          }
          .verify-button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              font-size: 18px;
              background-color: #506ae1;
              text-decoration: none;
              border-radius: 5px;
          }
          .footer {
              text-align: center;
              padding: 10px 0;
              color: #506ae1;
              font-size: 14px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Xác nhận tài khoản của bạn</h1>
          </div>
          <div class="content">
              <p>Xin chào,</p>
              <p>Cảm ơn vì đã sử dụng ứng dụng của chúng tôi. Để hoàn tất đăng ký, vui lòng xác minh địa chỉ email của bạn bằng cách nhấp vào nút bên dưới:</p>
              <a href='${url}' class="verify-button" style="color : white !important">Xác nhận</a>

          </div>
          <div class="footer">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `, // HTML body
}
};


export const sendEmail = async (url: string, to : string) => {
  try {
    const mail = mailOptions(url,to);
    console.log(mail);
    const info = await transporter.sendMail(mail);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
};



