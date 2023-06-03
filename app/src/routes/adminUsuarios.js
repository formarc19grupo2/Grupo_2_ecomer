const router = require('express').Router()
const { allUser, editUser, deleteUser, searchUser } = require('../controllers/adminUsuariosController')
const sessionAdminCheck = require("../middlewares/sessionAdminCheck");
router
    .get('/',sessionAdminCheck, allUser )
    .put('/:id',sessionAdminCheck, editUser)
    .delete('/:id',sessionAdminCheck, deleteUser)
    .get('/search',sessionAdminCheck, searchUser)

module.exports = router