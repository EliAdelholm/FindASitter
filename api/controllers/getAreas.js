module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sQuery = "SELECT * FROM areas"

    try {
        gDb.all(sQuery, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetAreas: ' + err)
                return res.json({ 'status': 'error' })
            }
            // gLog('info', ajRows)
            return res.json({ 'status': 'ok', 'data': ajRows});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetAreas: ' + ex)
        return res.json({ 'status': 'error' })
    }

}