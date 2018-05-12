const moment = require('moment')

module.exports = function (jData, fCallback) {

    // Prepare query and data
    jData.createdAt = moment().format('YYYY-MM-DD HH:MM:SS')
    let aData = [null, jData.conversationId, jData.createdAt, jData.userId, jData.text]
    let sQuery = "INSERT INTO messages VALUES(?, ?, ?, ?, ?)"

    gLog('info', jData)

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddMessage: ' + err)
                fCallback(true, { 'status': 'error' })
            }
            console.log(this)
            jData.id = this.lastID
            fCallback(false, { 'status': 'ok', data: jData })

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddMessage: ' + err)
        fCallback(true, { 'status': 'error' })
    }

}