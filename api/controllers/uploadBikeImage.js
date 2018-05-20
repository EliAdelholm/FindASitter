const buffer = require('buffer');
const path = require('path');
const fs = require('fs');
const moment = require('moment')

module.exports = function (image, extension, userId, timestamp, fCallback) {

    let filename = 'uploads/test-' + timestamp + '-' + userId + '.' + extension

    try {
        var buf = new Buffer(image, "base64")

        // We upload in two places because fuck Angular
        fs.writeFile(path.join(__dirname, '../../dist/assets/img/', filename), buf, function (error) {
            if (error) {
                console.log(error)
                return fCallback(true, null)

            } else {

                fs.writeFile(path.join(__dirname, '../../src/assets/img/', filename), buf, function (error) {
                    if (error) {
                        console.log(error)
                        return fCallback(true, null)

                    }
                    console.log('File created from base64 string!');
                    return fCallback(false, filename)
                });

            }
        });

    } catch (ex) {
        gLog('ex', 'EXCEPTION in UploadImage: ' + ex)
        return fCallback(true, null)
    }

}