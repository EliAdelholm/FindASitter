const jwt = require('jsonwebtoken')

module.exports = function (req, res) {

    let aData = [req.body.username, req.body.password]
    let sQuery = "SELECT * FROM users WHERE username = (?) AND password = (?)"

    try {
        gDb.all(sQuery, aData, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in Login: ' + err)
                return res.json({ 'status': 'error' })
            }

            if (!ajRows[0]) {
                return res.sendStatus(404)
            }

            // If a user is found, return data to client and start a session

            let user = ajRows[0]
            // First remove the password for security reasons
            delete user.password

            gLog('info', user)

            // Then create a token
            jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.log(err)
                    return res.json({ 'status': 'error' })
                }
                console.log(token)
                return res.json({ status: 'ok', data: user, token: token })
            })
            console.log('See me')

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in Login: ' + ex)
        return res.json({ 'status': 'error' })
    }

}