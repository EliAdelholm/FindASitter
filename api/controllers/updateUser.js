const moment = require('moment')

module.exports = function (req, res) {

    let userId = req.params.id
    let jData = req.body

    // Prepare query and data
    let sQuery = "UPDATE users SET (email, username, firstname, lastname, birthdate, areaId, licence, phone ) = ( ?, ?, ?, ?, ?, ?, ?, ? ) WHERE id = ?"
    let aData = [jData.email, jData.username, jData.firstname, jData.lastname, jData.birthdate, jData.area, jData.licence, jData.phone, userId]

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in UpdateUser: ' + err)
                return res.json({ 'status': 'error', err })
            }
            console.log(this)
            gLog('ok', 'SUCCESSFULLY updated user with id: ' + userId)
            return res.json({ status: 'ok', data: jData });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in UpdateUser: ' + err)
        return res.json({ 'status': 'error' })
    }

}