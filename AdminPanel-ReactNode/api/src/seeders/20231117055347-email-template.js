'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('EmailTemplates', [
      {
        key: "ForgotPasswordMail",
        title: "Admin Panel - Reset Password",
        fromEmail: "noreply@adminpanel.com",
        fromName: "Admin Panel",
        isManualMail: false,
        isContactUsMail: false,
        status: "Active",
        subject: "Reset Password",
        body: `<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="border-radius: 0 0 5px 5px;overflow: hidden;" width="500">
        <tbody>
          <tr>
            <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="430">
              <tbody>
                <tr>
                  <td align="center"><img src="##SITEURL##EmailTemplate/images/reset.png" width="313" /></td>
                </tr>
                <tr>
                  <td height="60" style="line-height: 60px;height: 60px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" style="color: #030154;font-size: 36px;line-height: 46px;font-weight: 800;font-family: 'Mulish', sans-serif;">Reset Password</td>
                </tr>
                <tr>
                  <td height="15" style="line-height: 15px;height: 15px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center"><img src="##SITEURL##EmailTemplate/images/border-line.png" /></td>
                </tr>
                <tr>
                  <td height="20" style="line-height: 20px;height: 20px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" style="color: #030154;font-size: 16px;line-height: 24px;font-weight: 400;font-family: 'Mulish', sans-serif;">You recently requested to reset your password for your account.</td>
                </tr>
                <tr>
                  <td align="center" style="color: #030154;font-size: 16px;line-height: 24px;font-weight: 400;font-family: 'Mulish', sans-serif;">Please click the link below to reset it.</td>
                </tr>
                <tr>
                  <td height="50" style="line-height: 50px;height: 50px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center"><a href="##RESETLINK##">Click Here</a></td>
                </tr>
                <tr>
                  <td height="50" style="line-height: 50px;height: 50px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" style="color: #030154;font-size: 16px;line-height: 24px;font-weight: 400;font-family: 'Mulish', sans-serif;">The password reset link is only valid for 30 minutes.&nbsp;</td>
                </tr>
                <tr>
                  <td height="45">&nbsp;</td>
                </tr>
              </tbody>
            </table>
            </td>
          </tr>
        </tbody>
      </table>
      `,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        key: "MasterTemplate",
        title: "Master Template",
        fromEmail: "MasterTemplate@MasterTemplate.com",
        fromName: "MasterTemplate",
        isManualMail: true,
        isContactUsMail: false,
        status: "Active",
        subject: "MasterTemplate",
        body: `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <title></title>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" rel="stylesheet" />
        <style type="text/css">body
        {width: 100%; background-color: #ffffff; margin:0; padding:0; -webkit-font-smoothing: antialiased;font-family: 'Mulish', sans-serif;}
        html
        {width: 100%; }
        </style>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td valign="top" width="100%">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tbody>
                  <tr>
                    <td bgcolor="#030154">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td height="40" style="line-height: 40px;height: 40px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="center"><a href="##SITEURL##"><img src="##SITEURL##EmailTemplate/images/logo.png" /> </a></td>
                        </tr>
                        <tr>
                          <td height="40" style="line-height: 40px;height: 40px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td>
                          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="border-radius: 5px 5px 0 0;overflow: hidden;" width="500">
                            <tbody>
                              <tr>
                                <td height="60" style="line-height: 60px;height: 60px;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#F9F9F9">
                    <table align="center" bgcolor="#F9F9F9" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="border-radius: 0 0 5px 5px;overflow: hidden;" width="500">
                            <tbody>
                              <tr>
                                <td>##CONTENT##</td>
                              </tr>
                            </tbody>
                          </table>
                          </td>
                        </tr>
                        <tr>
                          <td height="60" style="line-height: 60px;height: 60px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="center" style="font-size: 14px;line-height: 18px;color: #030154;font-weight: 400;font-family: 'Mulish', sans-serif;">Follow Us On</td>
                        </tr>
                        <tr>
                          <td height="10" style="line-height: 10px;height: 10px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                              <tr>
                                <td width="230">&nbsp;</td>
                                <td align="center" width="24"><a href="##FACEBOOKURL##"><img src="##SITEURL##EmailTemplate/images/facebook.png" /></a></td>
                                <td width="15">&nbsp;</td>
                                <td align="center" width="24"><a href="##TWITTERURL##"><img src="##SITEURL##EmailTemplate/images/twitter.png" /></a></td>
                                <td width="15">&nbsp;</td>
                                <td align="center" width="24"><a href="##LINKEDINURL##"><img src="##SITEURL##EmailTemplate/images/linkedin.png" /></a></td>
                                <td width="15">&nbsp;</td>
                                <td align="center" width="24"><a href="##INSTAGRAMURL##"><img src="##SITEURL##EmailTemplate/images/instagram.png" /></a></td>
                                <td width="229">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          </td>
                        </tr>
                        <tr>
                          <td height="24" style="line-height: 24px;height: 24px;">&nbsp;</td>
                        </tr>
                        <!--<tr>
                          <td align="center" style="font-size: 14px;line-height: 18px;color: #030154;font-weight: 400;font-family: 'Mulish', sans-serif;">if you want to stop receiving email, <a href="##UNSUBSCRIBE##" style="font-size: 14px;line-height: 18px;color: #030154;font-weight: 400;font-family: 'Mulish', sans-serif;" target="_blank">Click Here</a> to unsubscribe</td>
                        </tr>
                        <tr>
                          <td height="24" style="line-height: 24px;height: 24px;">&nbsp;</td>
                        </tr>-->
                        <tr>
                          <td bgcolor="#030154">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                              <tr>
                                <td height="10" style="line-height: 10px;height: 10px;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td align="left" width="160">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left" width="25">&nbsp;</td>
                                      <td align="left" style="font-size: 14px;line-height: 18px;color: #F9F9F9;font-weight: normal;font-family: 'Mulish', sans-serif;" width="90"><a href="##SITEURL####PRIVACYPOLICY##" style="color: #F9F9F9;text-decoration: none;">Privacy Policy</a></td>
                                    </tr>
                                  </tbody>
                                </table>
                                </td>
                                <td width="440">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="right" style="font-size: 14px;line-height: 18px;color: #F9F9F9;font-weight: normal;font-family: 'Mulish', sans-serif;">&copy;<a href="##SITEURL##" style="color: #F9F9F9;text-decoration: none;">Compare Your Repair</a></td>
                                      <td width="25">&nbsp;</td>
                                    </tr>
                                  </tbody>
                                </table>
                                </td>
                              </tr>
                              <tr>
                                <td height="10" style="line-height: 10px;height: 10px;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              </td>
            </tr>
          </tbody>
        </table>        
      `,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ], {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmailTemplates', null, {});
  }
};
