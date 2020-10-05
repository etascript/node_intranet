var express = require('express');
var router = express.Router();
var permisosController = require('../src/components/usuarios/controller');

router.get('/', function(req, res, next) {
    permisosController.mostrarTodosUsr(req, res);
});

router.get('/:id', function(req, res, next) {    
    const id = req.params.id;
    permisosController.mostrarUsr(req, res, id);
});

router.post('/add', function(req, res, next) {
    const userData = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        verifyPassword: req.body.verifyPassword,
        rol_id : req.body.rol_id
    }
    permisosController.insertarUsr(req, res, userData);
});

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    permisosController.deleteUsr(req, res, id);
});

router.patch('/:id', function(req, res, next) {
    const userData = {
        id_usuarios : req.params.id,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        verifyPassword: req.body.verifyPassword,
        rol_id : req.body.rol_id
    }
    permisosController.updateUsr(req, res, userData);
});

module.exports = router;