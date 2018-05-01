const moment = require('moment')

module.exports = function (req, res) {

    // Prepare query and data
    let datetime = moment().format('YYYY-MM-DD HH:MM:SS')
    let jData = req.body
    let aData = [null, jData.conversationId, datetime, jData.userId, jData.text]
    let sQuery = "INSERT INTO messages VALUES(?, ?, ?, ?, ?)"

    gLog('info', jData)

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddMessage: ' + err)
                return res.json({ 'status': 'error' })
            }
            console.log(this)
            return res.json({ 'status': 'ok', 'messageId': this.lastID, 'createdAt': datetime });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddMessage: ' + err)
        return res.json({ 'status': 'error' })
    }

}