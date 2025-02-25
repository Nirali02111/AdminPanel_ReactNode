import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport';
import { ErrorResponse } from '../common/response.model';
import { saveErrorLog } from '../services/errorlog.services';
export const sendMail = async (mailOptions: MailOptions) => {
    if (!process.env.MAIL || !process.env.PASS) {
        throw new ErrorResponse(500, 'Error while sending mail')
    }
    var mailOptions: MailOptions = {
        from: mailOptions.from || 'noreply@adminpanel.com',
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html
    };
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        logger: true,
        tls: {
            rejectUnauthorized: true
        },
        auth: {
            user: 'rakeshs.evince@gmail.com',
            pass: 'jlaqtucwfaumvhxc',
        },
    });
    try {
        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        console.log(error);
        await saveErrorLog(JSON.stringify({ error: error }))
        throw new ErrorResponse(500, error.message)
    }
    return null
}