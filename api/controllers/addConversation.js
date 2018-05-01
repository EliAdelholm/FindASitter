const moment = require('moment')

module.exports = function (req, res) {

    // TODO: Fix hardcoded values
    let iUserId = 1
    let iOtherUserId = 2
    let datetime = moment().format('YYYY-MM-DD HH:MM:SS')

    // TODO: Fix this when we know how to handle the data
    // Prepare query and data
    let sQuery = "INSERT INTO conversations VALUES(?, ?, ?, ?, ?)"
    let aData = [null, iConversationId, datetime, iUserId, sText]

    // try {
    //     gDb.run(sQuery, aData, function (err) {
    //         if (err) {
    //             gLog('err', 'ERROR in AddMessage: ' + err)
    //             return res.json({ 'status': 'error' })
    //         }
    //         console.log(this)
    //         return res.json({ 'status': 'ok', 'messageId': this.lastID, 'sentAt': datetime });

    //     })
    // } catch (ex) {
    //     gLog('ex', 'EXCEPTION in AddMessage: ' + err)
    //     return res.json({ 'status': 'error' })
    // }

}