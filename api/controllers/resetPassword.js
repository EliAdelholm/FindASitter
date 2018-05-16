
module.exports = function (req, res) {

    // Prepate query - return username if email is valid
    let token = req.body.token
    let password = req.body.newPassword
    let sQuery = "SELECT userId FROM tokens WHERE token = (?)"

    try {
        gDb.all(sQuery, token, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in ResetPassword: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)

            let user = ajRows[0].userId
            let sQuery = "UPDATE users SET (password) = (?) WHERE id = (?)"

            gDb.run(sQuery, password, user, function (err) {
                if (err) {
                    gLog('err', 'ERROR in ResetPassword: ' + err)
                    return res.json({ 'status': 'error' })
                }

                console.log(this)
                return res.json({ status: 'OK' })
            })

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in ResetPassword: ' + ex)
        return res.json({ 'status': 'error' })
    }

}