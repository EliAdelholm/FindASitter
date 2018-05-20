const request = require('request')

module.exports = function (req, res) {
    let make = req.params.make
    let search = req.params.search
    let url = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/' + make + '/vehicletype/motorcycle?format=json'

    try {
        request.get(url, function (err, httpResponse, body) {
            if (err) {
                console.log("ERROR in GetMotorcycleModels")
                return res.json([])
            }

            let models = JSON.parse(body).Results
            let filtered = models.filter(item => item.Model_Name && item.Model_Name.toLowerCase().includes(search.toLowerCase()))
            
            return res.json(filtered)
        })

    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddUser: ' + ex)
        return res.status(500)
    }

}