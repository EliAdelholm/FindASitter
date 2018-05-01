module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sQuery = "SELECT * FROM licences"

    try {
        gDb.all(sQuery, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetLicences: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)
            return res.json({ 'status': 'ok', 'data': ajRows});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetLicences: ' + ex)
        return res.json({ 'status': 'error' })
    }

}