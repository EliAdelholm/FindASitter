module.exports = function (req, res) {

    // TODO: Should we include the user that is making the request? And should we include all ratings or just AVG in initial response?
    // Prepate query - get only insensitive information
    let sQuery = "SELECT users.id AS id, username, firstname, lastname, birthdate, areaId, areas.name AS areaname, licence, licences.name AS licencename, image, ratings FROM users JOIN areas ON areaId = areas.id LEFT JOIN licences ON licence = licences.id"

    try {
        gDb.all(sQuery, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetUsers: ' + err)
                return res.json({ 'status': 'error' })
            }
            // gLog('info', ajRows)

            // Parse json
            for (let i = 0; i < ajRows.length; i++) {
                ajRows[i].ratings = JSON.parse(ajRows[i].ratings)
                // console.log(ajRows[i].ratings)
            }

            return res.json({ 'status': 'ok', 'data': ajRows });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetUsers: ' + ex)
        return res.json({ 'status': 'error' })
    }

}