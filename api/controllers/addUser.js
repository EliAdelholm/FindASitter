const moment = require('moment')
const request = require('request')

// const login = require(__dirname + '/login.js')

// Helper function to generate 4-digit code
function generateCode() {
    return Math.floor(1000 + Math.random() * 9000)
}

module.exports = function (req, res) {

    let datetime = moment().format('YYYY-MM-DD HH:MM:SS')
    let jData = req.body

    // Prepare user query and data
    let sQuery = "INSERT INTO users (email, username, firstname, lastname, password, areaId, phone, createdAt) VALUES( ?, ?, ?, ?, ?, ?, ?, ? )"
    let aData = [jData.email, jData.username, jData.firstname, jData.lastname, jData.password, jData.area, jData.phone, datetime]

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddUser: ' + err)
                return res.json({ status: 'ERROR', message: 'Could not create user' })
            }
            gLog('ok', 'SUCCESSFULLY added user with id: ' + this.lastID)

            // Prapare token data and save it to DB
            let token = generateCode()
            let userId = this.lastID
            let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
            let expiresAt = moment().add(1, 'd').format('YYYY-MM-DD HH:mm:ss');

            let aData = [token, userId, 'verify-phone', createdAt, expiresAt]
            let sQuery = "INSERT INTO tokens VALUES( ?, ?, ?, ?, ? )"

            gDb.run(sQuery, aData, function (err) {
                if (err) {
                    gLog('err', 'ERROR in AddUser: ' + err)
                    return res.json({ status: 'ERROR', message: 'Could not create verification token' })
                }

                // Send SMS with the code
                request.post('http://smses.io/api-send-sms.php', {
                    form: {
                        apiToken: '$2y$10$Nc8T7j8XKwkjlHVlnLVORu8dcwH6VWgWm4dqQsav6LVvonnk3NEDe',
                        mobile: jData.phone,
                        message: "Confirmation code: " + token
                    }
                }, function (err, httpResponse, body) {
                    if (err) {
                        console.log("Error sending sms")
                        return res.json({ status: "ERROR", message: 'Could not send SMS' })
                    }
                    return res.json({ status: 'OK' })
                })

            })


            // login(req, res)

            // return res.json({ 'status': 'ok', 'userId': this.lastID, 'createdAt': datetime });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddUser: ' + err)
        return res.json({ 'status': 'error' })
    }

}