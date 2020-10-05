var dbConn  = require('../../../lib/db');
var store = require('./store');
var response = require('../../util/response');

const mostrarRol = (req, res, id) => {
    try {
        dbConn.query(store.showOne, [id], (err, result, field) =>{
            if (err) throw err;
            var message = res.json(result[0]);          
            return message;
        });     
    } catch (error) {
        console.error(error);
        //response.error(req, res, error, 500);
        res.json(error);
    }
};

const mostrarTodosRoles = (req, res) => {
    try {
        dbConn.query(store.showAll, (err, result, field) =>{
            if (err) throw err;
            var message = res.json(result[0]);          
            return message;
        });     
    } catch (error) {
        console.error(error);
        response.error(req, res, error, 500);
    }
};

const insertarRol = (req, res, nombre) => {
    try{
        dbConn.query(store.insert, [nombre], (err, result, field) =>{
           if (err) throw err;            
           var message = res.send('Registro insertado con éxito!');   
           return message;           
       });
   } catch(error) {
       console.error(error);
       response.error(req, res, error, 500);
   }
};

const updateRol = (req, res, id, nombre) =>{
    try{
        dbConn.query(store.update, [id, nombre], (err, result, field) =>{
           if (err) throw err;            
           var message = res.send('Actualizado!');  
           return message;           
       });
   } catch(error) {
       console.error(error);
       response.error(req, res, error, 500);
   }
};

const deleteRol = (req, res, id) =>{
    try{
        dbConn.query(store.delete, [id], (err, result, field) =>{
           if (err) throw err;            
           var message = res.send('registro eliminado!');
           return message;            
       });
   } catch(error) {
       console.error(error);
       response.error(req, res, error, 500);
   }
};

module.exports = {
    mostrarRol,
    mostrarTodosRoles,
    insertarRol,
    updateRol,
    deleteRol
}