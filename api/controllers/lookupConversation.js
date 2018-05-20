module.exports = function (req, res) {

    // Prepate query - get only insensitive information
    let sUser1 = req.params.user1
    let sUser2 = req.params.user2

    console.log(sUser1, sUser2)

    let sQuery = "SELECT conversationId FROM users_conversations WHERE conversationId IN (\n" +
        "SELECT conversationId FROM users_conversations WHERE userId = (?) GROUP BY conversationId)\n" +
        "AND userId = (?)"

    try {
        gDb.all(sQuery, sUser2, sUser1, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in LookupConversation: ' + err)
                return res.status(500)
            }
            gLog('info', ajRows)

            if (!ajRows[0]) {
                conversationId = 'ERROR'
            } else {
                conversationId = ajRows[0].conversationId
            }

            return res.json({ status: 'OK', conversationId });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in LookupConversation: ' + ex)
        return res.status(500)
    }

}