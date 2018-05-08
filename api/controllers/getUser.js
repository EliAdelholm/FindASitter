module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let iUserId = req.params.id
    let sQuery = "SELECT * FROM users WHERE id = (?)"

    try {
        gDb.all(sQuery, iUserId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetUser: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)
            let user = ajRows[0];
            delete user.password
            user.ratings = JSON.parse(user.ratings)
            return res.json({ 'status': 'ok', 'data': user});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetUser: ' + ex)
        return res.json({ 'status': 'error' })
    }

}