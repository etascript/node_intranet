var dbConn  = require('../../../lib/db');
var store = require('./store');
var response = require('../../util/response');

const mostrarUsr = (req, res, id) => {
    try {
        dbConn.query(store.showOne, [id], (err, result, field) =>{
            if (err) throw err;
            var message = res.json(result[0]);          
            return message;
        });     
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

const mostrarTodosUsr = (req, res) => {
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

const insertarUsr = (req, res, userData) => {
    let username = userData.username;
    let email = userData.email;
    let password = userData.password;
    let verPass = userData.verifyPassword;
    let rol_id = userData.rol_id;
    const checkPassword = validarNewPass(password, verPass);
    const checkEmail = validarEmail(email);
    try{
        if(!checkEmail.check) {
            res.send(`Error: ${checkEmail.message}`);
        }else{
            if(!checkPassword.check) {
                res.send(`Error: ${checkPassword.message}`);
            }else{
                dbConn.query(store.insert, [username, email, password, rol_id], (err, result, field) =>{
                    if (err) throw err;            
                    return res.send('Registro insertado con éxito!');           
                });
            }
        }
   } catch(error) {
       console.error(error);
       res.send(`Error: ${error}`);
   }
};

const updateUsr = (req, res, userData) =>{
    const checkPassword = validarNewPass(userData.password, userData.verifyPassword);
    const checkEmail = validarEmail(userData.email);
    const checkVacios = validarCamposVacios(userData);
    try{
        if(!checkVacios.check) {
            res.send(`Error: ${checkEmail.message}`);
        }else{
            if(!checkPassword.check) {
                res.send(`Error: ${checkPassword.message}`);
            }else{
                if(!checkEmail.check) {
                    res.send(`Error: ${checkEmail.message}`);
                }else{
                    dbConn.query(store.update, [userData.id_usuarios, userData.username, userData.email, userData.password, userData.rol_id], (err, result, field) =>{
                        if (err) throw err;            
                        var message = res.send('Actualizado!');  
                        return message;           
                    });
                }
            }
        }       
   } catch(error) {
       console.error(error);
       response.error(req, res, error, 500);
   }
};

const deleteUsr = (req, res, id) =>{
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

const validarEmail = (email) => {
    var element = "";
    if (email.length > 0) {
        let tipoEmail = email.substring(email.length, email.length - 4);
        var contadorEmail = 0;
        if (tipoEmail != '.com') {
            console.log('email debe terminar en .com');
            return { check: false, message: 'Email inválido!' };
        } else {
            for (let index = 0; index < email.length; index++) {
                let element = email.charAt([index]);
                if (element == '@') contadorEmail++;
            }
            if (contadorEmail >= 2) {
                return { check: false, message: 'Email inválido!' };
               
            } else {               
                return { check: true, message: 'Email Ok!' };
            }
        }
    }else {
        console.log('Error! Campo email vacío!');
        return message;
    }
};

const validarNewPass = (pass, verPass) =>{
    if (pass == verPass) {
        return { check: true, message: 'Pass OK' };
    }else{
        return { check: false, message: 'Pass no coinciden!' };
    }
}

const validarCamposVacios = (userData) =>{
    console.log(userData.rol_id.length);
    if(userData.verifyPassword.length == 0 || userData.username.length == 0  || userData.email.length == 0  || userData.password.length == 0  || userData.rol_id.length == 0  ) {
        return { check: false, message: 'No pueden haber campos vacíos!' };
    }else{
        return { check: true, message: 'Datos OK' };
    }
};

const encryptPass = (userData) => {
    const password = userData.password;
    const verifyPassword = userData.verifyPassword;
};

module.exports = {
    mostrarUsr,
    mostrarTodosUsr,
    insertarUsr,
    updateUsr,
    deleteUsr
}