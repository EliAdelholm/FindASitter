const request = require('request')

module.exports = function (req, res) {
    let search = req.params.search

    try {
        // Get data from json file
        var data = gFs.readFileSync(__dirname + '/../data/motorcycleMakes.json', 'utf8')

        let makes = JSON.parse(data)
        let filtered = makes.filter(item => item.MakeName && item.MakeName.toLowerCase().includes(search.toLowerCase()))

        console.log(filtered)
        return res.json(filtered)


    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddUser: ' + ex)
        return res.status(500)
    }

}