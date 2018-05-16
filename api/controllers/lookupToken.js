const moment = require('moment')

module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sToken = req.params.token
    let sQuery = "SELECT * FROM tokens WHERE token = (?)"

    try {
        gDb.all(sQuery, sToken, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in LookupToken: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)
            if (!ajRows[0]) {
                return res.json( {status: 'ERROR', message: 'Invalid Token' });
            }
            let expirationDate = moment(ajRows[0].expiresAt, "YYYY-MM-DD HH:mm:ss");
            let now = moment();
            console.log(expirationDate, now)
            if (expirationDate.isBefore(now)) {
                return res.json({ status: 'ERROR', message: 'Token has expired' })
            }
            return res.json( { status: 'OK' } );

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in LookupToken: ' + ex)
        return res.json({ 'status': 'error' })
    }

}