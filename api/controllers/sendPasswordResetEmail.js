const nodemailer = require('nodemailer');
const moment = require('moment')

let transporter = nodemailer.createTransport({
    host: 'send.one.com',
    port: 587,
    secure: false,
    auth: {
        user: 'findabiker@eliadelholm.com',
        pass: 'secret'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

module.exports = function (req, res) {

    // Prepate query - return username if email is valid
    let sEmail = req.params.email
    let sQuery = "SELECT username, id FROM users WHERE email = (?)"

    try {
        gDb.all(sQuery, sEmail, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in SendPasswordResetEmail: ' + err)
                return res.json({ 'status': 'error', message: 'Error processing request. Try again later.' })
            }
            gLog('info', ajRows)

            if (!ajRows[0]) {
                return res.json({ status: 'ERROR', message: 'Email is not registered' })
            }

            let user = ajRows[0].username
            let userId = ajRows[0].id

            let token = moment().unix() + '-' + userId;
            let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
            let expiresAt = moment().add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
            let resetUrl = 'http://localhost:3000/home/reset-password/' + token

            let aData = [token, userId, 'reset-password', createdAt, expiresAt]
            let sQuery = "INSERT INTO tokens VALUES( ?, ?, ?, ?, ? )"

            gDb.run(sQuery, aData, function (err) {
                if (err) {
                    gLog('err', 'ERROR in SendPasswordResetEmail: ' + err)
                    return res.json({ 'status': 'error', message: 'Error processing request. Try again later.' })
                }

                let mailOptions = {
                    from: '"Find A Biker" <findabiker@eliadelholm.com>',
                    to: sEmail,
                    subject: 'Password Reset',
                    text: 'You have requested a password reset for your Find A Biker account',
                    html: '<p><b>Hi ' + user + ',</b></p>\
                        <p>You have requested a password reset for your Find A Biker account</p>\
                        <p>Please follow the link: <a href="' + resetUrl + '">' + resetUrl + '</a></p>\
                        <p>You have 24 hours to reset your password before this token expires.</p>\
                        <p>Ride safe,<br>The Find A Biker Team</p>'
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.json({ status: 'ERROR', message: 'Failed to send email to ' + sEmail })
                    }
                    console.log('Message sent: %s', info.messageId);
                    return res.json({ status: 'OK', message: 'Email sent to ' + sEmail });
                });
            })

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in SendPasswordResetEmail: ' + ex)
        return res.json({ 'status': 'error', message: 'Error processing request. Try again later.' })
    }

}