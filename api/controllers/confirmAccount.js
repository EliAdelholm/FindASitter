
module.exports = function (req, res) {

    // Prepate query - return username if email is valid
    let token = req.params.token
    console.log(token)
    let sQuery = "SELECT userId FROM tokens WHERE token = (?)"

    try {
        gDb.all(sQuery, token, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in ResetPassword: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)

            if(!ajRows[0]) {
                return res.json({ status: 'ERROR', message: 'Invalid Code'})
            }

            let user = ajRows[0].userId
            let sQuery = "UPDATE users SET (verified) = 1 WHERE id = (?)"

            gDb.run(sQuery, user, function (err) {
                if (err) {
                    gLog('err', 'ERROR in ResetPassword: ' + err)
                    return res.json({ 'status': 'ERROR', message: 'Confirmation Failed. Please try again' })
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