module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sEmail = req.params.email
    let sQuery = "SELECT COUNT(*) AS count FROM users WHERE email = (?)"

    try {
        gDb.all(sQuery, sEmail, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in LookupEmail: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)
            let result = ajRows[0].count == 0 ? true : false
            return res.json( result);

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in LookupEmail: ' + ex)
        return res.json({ 'status': 'error' })
    }

}