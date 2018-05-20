/* DEPENDENCIES */
const express = require('express');
const router = express.Router();

/* CONTROLLERS */
const lookupEmail = require(__dirname + '/controllers/lookupEmail.js')
const lookupUsername = require(__dirname + '/controllers/lookupUsername.js')
const addUser = require(__dirname + '/controllers/addUser.js')
const login = require(__dirname + '/controllers/login.js')
const updateUser = require(__dirname + '/controllers/updateUser.js')
const getUser = require(__dirname + '/controllers/getUser.js')
const deleteUser = require(__dirname + '/controllers/deleteUser.js')
const getUsers = require(__dirname + '/controllers/getUsers.js')
const getConversations = require(__dirname + '/controllers/getConversations.js')
const getMessages = require(__dirname + '/controllers/getMessages.js')
const addMessage = require(__dirname + '/controllers/addMessage.js')
const getAreas = require(__dirname + '/controllers/getAreas.js')
const getLicences = require(__dirname + '/controllers/getLicences.js')
const uploadImage = require(__dirname + '/controllers/uploadImage.js')
const addRating = require(__dirname + '/controllers/addRating.js')
const lookupConversation = require(__dirname + '/controllers/lookupConversation.js')
const addConversation = require(__dirname + '/controllers/addConversation.js')
const sendPasswordResetEmail = require(__dirname + '/controllers/sendPasswordResetEmail.js')
const lookupToken = require(__dirname + '/controllers/lookupToken.js')
const resetPassword = require(__dirname + '/controllers/resetPassword.js')
const confirmAccount = require(__dirname + '/controllers/confirmAccount.js')
const findMotorcycleMakes = require(__dirname + '/controllers/findMotorcycleMakes.js')
const findMotorcycleModels = require(__dirname + '/controllers/findMotorcycleModels.js')
const addBike = require(__dirname + '/controllers/addBike.js')

/* API ROUTES */
router.get('/areas', function (req, res) {
    getAreas(req, res)
})

router.post('/rating/:id', function (req, res) {
    addRating(req, res)
})

router.post('/image/:id', function (req, res) {
    uploadImage(req, res)
})

router.get('/licences', function (req, res) {
    getLicences(req, res)
})

router.get('/lookup-email/:email', function (req, res) {
    lookupEmail(req, res)
})

router.get('/lookup-username/:username', function (req, res) {
    lookupUsername(req, res)
})

router.post('/user', function (req, res) {
    addUser(req, res)
})

router.post('/login', function (req, res) {
    login(req, res)
})

router.post('/user/:id', function (req, res) {
    updateUser(req, res)
})

router.get('/user/:id', function (req, res) {
    getUser(req, res)
})

router.delete('/user/:id', function (req, res) {
    deleteUser(req, res)
})

router.get('/users', function (req, res) {
    getUsers(req, res)
})

router.get('/conversations/:id', function (req, res) {
    getConversations(req, res)
})

router.get('/messages/:id', function (req, res) {
    getMessages(req, res)
})

router.get('/lookup-conversation/:user1/:user2', function (req, res) {
    lookupConversation(req, res)
})

router.get('/add-conversation/:user1/:user2', function (req, res) {
    addConversation(req, res)
})

router.get('/reset-password/:email', function (req, res) {
    sendPasswordResetEmail(req, res)
})

router.get('/lookup-token/:token', function (req, res) {
    lookupToken( req, res )
})

router.post('/reset-password/', function (req, res) {
    resetPassword( req, res )
})

router.get('/confirm-account/:token', function (req, res) {
    confirmAccount( req, res )
})

router.get('/motorcycle-makes/:search', function (req, res) {
    findMotorcycleMakes( req, res )
})

router.get('/motorcycle-models/:make/:search', function (req, res) {
    findMotorcycleModels( req, res )
})

router.post('/bike', function (req, res) {
    addBike( req, res )
})


module.exports = router