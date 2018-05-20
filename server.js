/* DEPENDENCIES */

const express = require('express')
const app = express()
const sqlite = require('sqlite3')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http)
const request = require('request')

// GLOBALS
global.gFs = require('fs')
global.gDb = new sqlite.Database(__dirname + '/db.db')
global.gLog = (sStatus, sMessage) => {
    switch (sStatus) {
        case 'ok':
            console.log(chalk.green(sMessage))
            break
        case 'err':
            console.log(chalk.red(sMessage))
            break
        case 'ex':
            console.log(chalk.magenta(sMessage))
            break
        case 'info':
            console.log(sMessage)
            break
    }
}

// Get motorcycle data from API and save to file
// Don't use with nodemon because server will restart everytime the function writes to file
const getMotorcycleMakes = require(__dirname + '/api/controllers/getMotorcycleMakes.js')
// getMotorcycleMakes()

// Use BodyParser
app.use(bodyParser.json({limit: '50mb'}))

// Use Angular dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const addMessage = require(__dirname + '/api/controllers/addMessage.js')
let clients = []

io.on('connection', function (socket) {
    console.log('New connection with ID:', socket.id)

    socket.on('storeClientInfo', function (data) {
        var clientInfo = new Object()
        clientInfo.clientId = socket.id;
        clientInfo.userId = data.userId
        clients.push(clientInfo);

        console.log(clients)

        socket.on('disconnect', function (reason) {
            console.log("Disconnect: ", socket.id, reason)

            let client = clients.findIndex(x => x.clientId == socket.id);
            clients.splice(client, 1);
         });
    });

    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        addMessage(message, function (err, jData) {
            if (err) {
                return;
            }
            io.emit('message', jData.data);   
        }) 
    });

    socket.on('client sent message', function (jData) {
        let client = clients.findIndex(x => x.clientId == socket.id);

        console.log(clients[client])
        // send data to everyone but sender
        console.log(jData, socket.id)
        socket.broadcast.emit('server sent message', { 
            "status": jData.message, 
            "alias": clients[client].alias, 
            "color": clients[client].color 
        })

    })
});

// Listen on port 3333
http.listen('3000', err => {
    if (err) {
        gLog('err', 'Failed to connect to server')
        return
    }
    gLog('ok', 'Server running on port 3000')
    return
})
