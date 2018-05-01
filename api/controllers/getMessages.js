module.exports = function (req, res) {

    // Prepate query and requested conversation id
    let iConversationId = req.params.id;
    let sQuery = "SELECT * FROM messages WHERE conversationId = (?)"

    try {
        gDb.all(sQuery, iConversationId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetMessages: ' + err)
                return res.json({ 'status': 'error' })
            }
            gLog('info', ajRows)
            return res.json({ 'status': 'ok', 'data': ajRows});

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetMessages: ' + ex)
        return res.json({ 'status': 'error' })
    }

}