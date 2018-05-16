const moment = require('moment')

module.exports = function (req, res) {

    let datetime = moment().format('YYYY-MM-DD HH:MM:SS')

    // Prepare query and data for conversation
    let sQuery = "INSERT INTO conversations VALUES ( ?, ? )"
    let aData = [null, datetime]

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddConversation: ' + err)
                return res.status(500)
            }
            console.log(this)

            // Prepare query and data for users
            let conversationId = this.lastID
            let sQuery = "INSERT INTO users_conversations VALUES ( ?, ? ), ( ?, ? )"
            let aData = [conversationId, req.params.user1, conversationId, req.params.user2]

            gDb.run(sQuery, aData, function (err) {
                if (err) {
                    gLog('err', 'ERROR in AddConversation - users: ' + err)
                    return res.status(500)
                }
                console.log(this)
                return res.json({ 'status': 'OK', conversationId: conversationId });
            })
        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddConversation: ' + err)
        return res.status(500)
    }

}