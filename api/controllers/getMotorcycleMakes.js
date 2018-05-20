const request = require('request')

module.exports = function () {

    try {

        console.log("Getting Motorcycle Makes")

        request.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/motorcycle?format=json', function (err, httpResponse, body) {
            if (err) {
                console.log("ERROR in GetMotorcycleMakes")
                return
            }

            let makes = JSON.parse(body).Results
            console.log("Got Motorcycle Makes")

            gFs.writeFile(__dirname + "/../data/motorcycleMakes.json", JSON.stringify(makes), (err) => {
                if (err) {
                    console.error(err);
                    return
                };
                console.log("Motorcycle Makes File has been created");
                return
            });
        })


    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetMotorcycleMakes: ' + ex)
        return
    }

}