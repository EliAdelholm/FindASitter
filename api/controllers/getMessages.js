module.exports = function (req, res) {

    // Prepate query and requested conversation id
    let iConversationId = req.params.id;
    let sQuery = "SELECT messages.id AS id, username, image, messages.createdAt AS createdAt, userId, text FROM messages JOIN users ON userId = users.id WHERE conversationId = (?)"

    try {
        gDb.all(sQuery, iConversationId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetMessages: ' + err)
                return res.json({ 'status': 'error' })
            }
            // gLog('info', ajRows)
            return res.json({ status: 'ok', data: ajRows, conversation: iConversationId});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetMessages: ' + ex)
        return res.json({ 'status': 'error' })
    }

}