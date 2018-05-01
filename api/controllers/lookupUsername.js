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
            return res.json({ 'status': 'ok', 'data': ajRows});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in LookupUsername: ' + ex)
        return res.json({ 'status': 'error' })
    }

}