const moment = require('moment')

module.exports = function (req, res) {

    // Get variables
    let userId = req.params.id
    let datetime = moment().format('YYYY-MM-DD HH:MM:SS')
    let jData = req.body

    // Prepare query and data
    let sQuery = "UPDATE users SET ratings = json_insert(ratings, '$[' || json_array_length(ratings) || ']', json_object( ?, ?, ?, ?, ?, ?, ?, ? )) WHERE id = ?"
    let aData =  [ 'userId', jData.userId, 'rating', jData.rating, 'message', jData.message, 'createdAt', datetime, userId ]

    // Run query
    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddRating: ' + err)
                return res.json({ 'status': 'error', err })
            }
            
            gLog('ok', 'SUCCESSFULLY added rating to user with id: ' + userId)
            return res.json({ status: 'ok', data: jData, profile: userId });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddRating: ' + err)
        return res.json({ 'status': 'error' })
    }

}