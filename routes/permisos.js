var express = require('express');
var router = express.Router();
var permisosController = require('../src/components/permisos/controller');

router.get('/', function(req, res, next) {
    permisosController.mostrarTodosPermisos(req, res);
});

router.get('/:id', function(req, res, next) {    
    const id = req.params.id;
    permisosController.mostrarPermisos(req, res, id);
});

router.post('/add', function(req, res, next) {
    const permisosData = {
        nombre : req.body.nombre,
        valor : req.body.valor
    }
    permisosController.insertarPermisos(req, res, permisosData);
});

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    permisosController.deletePermisos(req, res, id);
});

router.patch('/:id', function(req, res, next) {
    const permisosData = {
        nombre : req.body.nombre,
        valor : req.body.valor
    }
    permisosController.updatePermisos(req, res, permisosData);
});

module.exports = router;
