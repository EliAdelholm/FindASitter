const moment = require('moment')
const login = require(__dirname + '/login.js')

module.exports = function (req, res) {

    let datetime = moment().format('YYYY-MM-DD HH:MM:SS')
    let jData = req.body

    // Prepare query and data
    let sQuery = "INSERT INTO users (email, username, firstname, lastname, password, areaId, phone, createdAt) VALUES( ?, ?, ?, ?, ?, ?, ?, ? )"
    let aData = [jData.email, jData.username, jData.firstname, jData.lastname, jData.password, jData.area, jData.phone, datetime]

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddUser: ' + err)
                return res.json({ 'status': 'error', err })
            }
            gLog('ok', 'SUCCESSFULLY added user with id: ' + this.lastID)
            // TODO: HERE WE NEED TO SEND THE USER AN EMAIL FOR VERIFICATION

            login(req, res)

            // return res.json({ 'status': 'ok', 'userId': this.lastID, 'createdAt': datetime });

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddUser: ' + err)
        return res.json({ 'status': 'error' })
    }

}