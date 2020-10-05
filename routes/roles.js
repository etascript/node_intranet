var express = require('express');
var router = express.Router();
var rolesController = require('../src/components/roles/controller');

router.get('/', (req, res) =>{
    rolesController.mostrarTodosRoles(req, res);
});

router.get('/:id', (req, res) =>{
    let id = req.params.id;
    rolesController.mostrarRol(req, res, id);
});

router.post('/add', (req, res, next)=> {
    var nombre = req.body.nombre;
    rolesController.insertarRol(req, res, nombre);
});

router.patch('/:id', (req, res)=>{
    var id = req.params.id;
    var nombre = req.body.nombre;
    rolesController.updateRol(req, res, id, nombre);
});

router.delete('/:id', (req, res) =>{
    var id = req.params.id;
    rolesController.deleteRol(req, res, id);
});

module.exports = router;