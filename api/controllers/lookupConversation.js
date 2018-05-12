module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sUser1 = req.params.user1
    let sUser2 = req.params.user2

    let sQuery = "SELECT id, COUNT(*) AS count FROM conversations JOIN users_conversations ON conversations.id = conversationId WHERE userId IN ( ?, ? ) GROUP BY id"

    try {
        gDb.all(sQuery, sUser1, sUser2, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in LookupConversation: ' + err)
                return res.status(500)
            }
            // gLog('info', ajRows)

            // Find the right conversation
            let conversationId
            let conversation = ajRows.find(item => {
                return item.count == 2
            })

            if (conversation) {
                conversationId = conversation.id
            } else {
                conversationId = 'ERROR'
            }
            
            return res.json({ status: 'OK', conversationId });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in LookupConversation: ' + ex)
        return res.status(500)
    }

}