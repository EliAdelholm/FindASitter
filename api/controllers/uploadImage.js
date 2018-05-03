var buffer = require('buffer');
var path = require('path');
var fs = require('fs');
const moment = require('moment')

function decode_base64(base64str, filename) {

    var buf = new Buffer(base64str, "base64")

    fs.writeFile(path.join(__dirname, '../../src/assets/img/uploads/', filename), buf, function (error) {
        if (error) {
            console.log(error)
        } else {
            console.log('File created from base64 string!');
        }
    });

}

module.exports = function (req, res) {

    let image = req.body.image
    let timestamp = moment().unix();
    let userId = req.params.id
    let filename = 'uploads/' + timestamp + '-' + userId + '.' + req.body.extension

    try {
        var buf = new Buffer(image, "base64")

        // We upload in two places because fuck Angular
        fs.writeFile(path.join(__dirname, '../../dist/assets/img/', filename), buf, function (error) {
            if (error) {
                console.log(error)
                return res.status(400)

            } else {

                fs.writeFile(path.join(__dirname, '../../src/assets/img/', filename), buf, function (error) {
                    if (error) {
                        console.log(error)
                        return res.status(400)

                    } else {
                        console.log('File created from base64 string!');
                        let sQuery = "UPDATE users SET ( image ) = ( ? ) WHERE id = ?"

                        gDb.run(sQuery, filename, userId, function (err) {
                            if (err) {
                                gLog('err', 'ERROR in UploadImage: ' + err)
                                return res.status(400)
                            }

                            gLog('ok', 'SUCCESSFULLY uploaded image for user with id: ' + userId)
                            return res.json({ status: 'ok', data: { image: filename } });

                        })
                    }
                });
                
            }
        });

    } catch (ex) {
        gLog('ex', 'EXCEPTION in UploadImage: ' + ex)
        return res.json({ 'status': 'error' })
    }

}