module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sUsername = req.params.username
    let sQuery = "SELECT COUNT(*) AS count FROM users WHERE username = (?)"

    try {
        gDb.all(sQuery, sUsername, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in LookupUsername: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)
            let result = ajRows[0].count == 0 ? true : false
            return res.json( result);

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in LookupUsername: ' + ex)
        return res.json({ 'status': 'error' })
    }

}