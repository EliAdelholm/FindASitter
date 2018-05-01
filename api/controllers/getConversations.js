module.exports = function (req, res) {

    // Prepate query and requested conversation id
    let iUserId = req.params.id;
    let sQuery = "SELECT conversationId, userId, username, image FROM users_conversations JOIN users ON userId = users.id WHERE conversationId IN (SELECT conversationId FROM users_conversations WHERE userId = (?))"

    try {
        gDb.all(sQuery, iUserId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetConversations: ' + err)
                return res.json({ 'status': 'error' })
            }

            // Get distinct conversationIds and create objects
            var flags = []
            var retval = []
            for (let i = 0; i < ajRows.length; i++) {
                if (flags[ajRows[i].conversationId]) continue;
                flags[ajRows[i].conversationId] = true;
                retval.push({id: ajRows[i].conversationId, users: []});
            }

            // Fill user data into respective objects
            ajRows.forEach(element => {
                let conversation = retval.find(item => item.id === element.conversationId)
                if (element.userId !== Number(iUserId)) {
                    conversation.users.push({id: element.userId, username: element.username, image: element.image})
                }
            });

            gLog('info', retval)
            return res.json({ 'status': 'ok', 'data': retval });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetConversations: ' + ex)
        return res.json({ 'status': 'error' })
    }

}