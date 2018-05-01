module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let iUserId = req.params.id
    let sQuery = "DELETE FROM users WHERE id = (?)"

    try {
        gDb.all(sQuery, iUserId, function (err) {
            if (err) {
                gLog('err', 'ERROR in DeleteUser: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('ok', 'SUCCESSFULLY deleted user with id: ' + iUserId)
            return res.json({ 'status': 'ok'});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in DeleteUser: ' + ex)
        return res.json({ 'status': 'error' })
    }

}