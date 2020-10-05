var express = require('express');
var router = express.Router();
var estadoController = require('../src/components/estado/controller');

router.get('/', (req, res) =>{
    estadoController.mostrarEstados(req, res);
});

router.get('/all/:id', (req, res)=>{
    const in_id = req.params.id;
    estadoController.mostrarTodos(req, res, in_id);
});

router.delete('/:id', (req, res) =>{
    let id = req.params.id;
    estadoController.eliminarEstado(req,res, id);
});

router.patch('/:id', (req, res) =>{
    let id = req.params.id;
    let newDescription = req.body.descripcion;
    estadoController.updateEstado(req, res, id, newDescription);
});

router.post('/add', function(req, res, next) {    
    let new_description = req.params.descripcion;
    estadoController.insertarEstado(req,res, new_description);
});

module.exports = router;