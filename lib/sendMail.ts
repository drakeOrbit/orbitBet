import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
// import { readFileSync } from 'fs';
// import { join } from 'path';
import { connectToDb } from '@/utils/connectDb';
import { Subscriber } from './models';

async function sendMail() {
  await connectToDb();

  // HTML dosyasını oku
  // const emailTemplatePath = join(process.cwd(), 'emails/email-template.html');
  // const emailHtml = readFileSync(emailTemplatePath, 'utf-8');

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  try {
    // Aboneleri veritabanından çek
    const subscribers = await Subscriber.find({});

    // Eğer abone yoksa, işlemi durdur
    if (subscribers.length === 0) {
      console.log('No subscribers found.');
      return;
    }

    // Her bir aboneye e-posta gönder
    for (const subscriber of subscribers) {
      const mailOptions: Mail.Options = {
        from: process.env.NODEMAILER_EMAIL,
        to: subscriber.email, // Abonenin e-posta adresi
        subject: `BetOrbit Yeni | BetOrbit New`,
        html: emailHtml,
      };

      await transport.sendMail(mailOptions);
    }

    console.log('Emails sent successfully to all subscribers.');
  } catch (err) {
    console.log('sendMail error:', err);
  }
}

export { sendMail };

const emailHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style media="all" type="text/css">
      /* -------------------------------------
    GLOBAL RESETS
------------------------------------- */

      body {
        font-family: Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 16px;
        line-height: 1.3;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%;
      }

      table td {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        vertical-align: top;
      }
      /* -------------------------------------
    BODY & CONTAINER
------------------------------------- */

      body {
        background-color: #f4f5f6;
        margin: 0;
        padding: 0;
      }

      .body {
        background-color: #f4f5f6;
        width: 100%;
      }

      .container {
        margin: 0 auto !important;
        max-width: 600px;
        padding: 0;
        padding-top: 24px;
        width: 600px;
      }

      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 600px;
        padding: 0;
      }
      /* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */

      .main {
        background: #121826;
        border: 1px solid #eaebed;
        border-radius: 16px;
        width: 100%;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 24px;
      }

      .footer {
        clear: both;
        padding-top: 24px;
        text-align: center;
        width: 100%;
      }

      .footer td,
      .footer p,
      .footer span,
      .footer a {
        color: #9a9ea6;
        font-size: 16px;
        text-align: center;
      }
      /* -------------------------------------
    TYPOGRAPHY
------------------------------------- */

      p {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 16px;
      }

      a {
        color: #0867ec;
        text-decoration: underline;
      }
      /* -------------------------------------
    BUTTONS
------------------------------------- */

      .btn {
        box-sizing: border-box;
        min-width: 100% !important;
        width: 100%;
      }

      .btn > tbody > tr > td {
        padding-bottom: 16px;
      }

      .btn table {
        width: auto;
      }

      .btn table td {
        background-color: black;
        border-radius: 4px;
        text-align: center;
      }

      .btn a {
        background-color: #ffffff;
        border: solid 2px #0867ec;
        border-radius: 4px;
        box-sizing: border-box;
        color: #0867ec;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        padding: 12px 24px;
        text-decoration: none;
        text-transform: capitalize;
      }

      .btn-primary table td {
        background-color: #0867ec;
      }

      .btn-primary a {
        background-color: #0867ec;
        border-color: #0867ec;
        color: #ffffff;
      }

      /* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */

      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .text-link {
        color: #0867ec !important;
        text-decoration: underline !important;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      /* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */

      @media only screen and (max-width: 640px) {
        .main p,
        .main td,
        .main span {
          font-size: 16px !important;
        }
        .wrapper {
          padding: 8px !important;
        }
        .content {
          padding: 0 !important;
        }
        .container {
          padding: 0 !important;
          padding-top: 8px !important;
          width: 100% !important;
        }
        .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        .btn table {
          max-width: 100% !important;
          width: 100% !important;
        }
        .btn a {
          font-size: 16px !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      }
      /* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */

      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
    >
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
            <!-- START CENTERED WHITE CONTAINER -->

            <table
              style="border: 2px solid #d1d5db"
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="main"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <!-- <h2>BetsOrbit'den yeni mesaj</h2> -->
                <td class="wrapper">
                  <p style="color: #d1d5db; font-weight: 700">
                    Yeni Bahis Tablosu Eklendi!
                  </p>
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="btn btn-primary"
                  >
                    <tbody>
                      <tr>
                        <td align="left">
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <a
                                    style="
                                      padding: 10px 35px;
                                      background: #6366f1;
                                      border: 1px solid #6366f1;
                                    "
                                    href="https://betorbit.vercel.app/"
                                    target="_blank"
                                    >Göz At</a
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="color: #d1d5db">
                    BetOrbit, bahisçilerin yeni evi - nerede olursanız olun,
                    kazanmanın sınırlarını zorlayın.
                  </p>
                </td>
              </tr>

              <tr>
                <td class="wrapper" style="border-top: 1px solid #d1d5db">
                  <p style="color: #d1d5db; font-weight: 700">
                    New Bets Table is Added
                  </p>
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="btn btn-primary"
                  >
                    <tbody>
                      <tr>
                        <td align="left">
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <a
                                    style="
                                      padding: 10px 25px;
                                      background: #6366f1;
                                      border: 1px solid #6366f1;
                                    "
                                    href="https://betorbit.vercel.app/"
                                    target="_blank"
                                    >Check Out</a
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="color: #d1d5db">
                    BetOrbit, the new home of betters - wherever you are, Push
                    the limits of winning.
                  </p>

                  <p
                    style="color: #d1d5db; text-align: center; margin: 40px 0px"
                  >
                    <a
                      style="color: #d1d5db"
                      href="https://betorbit.vercel.app/"
                      >BetsOrbit</a
                    >
                  </p>
                </td>
              </tr>

              <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`;
