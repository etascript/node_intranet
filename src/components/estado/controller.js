var dbConn  = require('../../../lib/db');
var store = require('./store');
var response = require('../../util/response');

const mostrarEstados = async (req, res) =>{
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

const mostrarTodos =  (req, res, id) =>{
    try{
         dbConn.query(store.showOne, [id], (err, result, field) =>{
            if (err) throw err;            
            var message = res.json(result[0]); 
            return message;            
        });
    } catch(error) {
        console.error(error);
        response.error(req, res, error, 500);
    }
};

const insertarEstado = (req, res, descripcion) => {
    try{
        dbConn.query(store.insert, [descripcion], (err, result, field) =>{
           if (err) throw err;            
           var message = res.send('Registro insertado con éxito!');   
           return message;           
       });
   } catch(error) {
       console.error(error);
       response.error(req, res, error, 500);
   }
};

const updateEstado = (req, res, id, descripcion) => {
    try{
        dbConn.query(store.update, [descripcion, id], (err, result, field) =>{
           if (err) throw err;            
           var message = res.send('Actualizado!');  
           return message;           
       });
   } catch(error) {
       console.error(error);
       response.error(req, res, error, 500);
   }
};

const eliminarEstado =  (req, res, id) =>{
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
    mostrarEstados,
    mostrarTodos,
    insertarEstado,
    updateEstado,
    eliminarEstado
}