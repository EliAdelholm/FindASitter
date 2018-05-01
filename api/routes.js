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

/* API ROUTES */
router.get('/areas', function (req, res) {
    getAreas(req, res)
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

router.get('/user/delete/:id', function (req, res) {
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

router.post('/message/add', function (req, res) {
    addMessage(req, res)
})

module.exports = router