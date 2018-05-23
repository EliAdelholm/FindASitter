const moment = require('moment')
const uploadImage = require('./uploadBikeImage')

module.exports = function (req, res) {

    const jData = req.body;

    let timestamp = moment().unix();
    let image = uploadImage(jData.image, jData.extension, jData.userId, timestamp, function (err, image) {
        if (err) {
            return res.json({ status: 'ERROR', message: 'Could not add bike' })
        }

        console.log(jData.userId)

        let aData = [null, jData.userId, jData.make, jData.model, jData.year, image, timestamp]
        let sQuery = "INSERT INTO bikes VALUES( ?, ?, ?, ?, ?, ?, ? )"

        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddUser: ' + err)
                return res.json({ status: 'ERROR', message: 'Could not add bike' })
            }
            gLog('ok', 'SUCCESSFULLY added bike with id: ' + this.lastID)

            return res.json({ status: 'OK', message: 'Bike added' })
        })
    })



}