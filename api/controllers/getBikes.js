module.exports = function (req, res) {

    let userId = req.params.id
    let sQuery = "SELECT * FROM bikes WHERE userId = ?"

    try {
        gDb.all(sQuery, userId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetBikes: ' + err)
                return res.json({ 'status': 'error' })
            }
            // gLog('info', ajRows)

            return res.json({ 'status': 'ok', userId: userId, 'data': ajRows });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetBikes: ' + ex)
        return res.json({ 'status': 'error' })
    }

}