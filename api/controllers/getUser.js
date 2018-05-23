module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let iUserId = req.params.id
    let sQuery = "SELECT * FROM users WHERE id = (?)"
    let sBikeQuery = "SELECT * FROM bikes WHERE userId = ?"

    try {
        gDb.all(sQuery, iUserId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetUser: ' + err)
                return res.json({ 'status': 'error' })
            }
            // gLog('info', ajRows)
            let user = ajRows[0];
            delete user.password
            user.ratings = JSON.parse(user.ratings)

            gDb.all(sBikeQuery, iUserId, function (err, ajRows) {
                if (err) {
                    gLog('err', 'ERROR in GetUser: ' + err)
                    return res.json({ 'status': 'error' })
                }

                user.bikes = ajRows;
                return res.json({ 'status': 'ok', 'data': user});
            })

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetUser: ' + ex)
        return res.json({ 'status': 'error' })
    }

}