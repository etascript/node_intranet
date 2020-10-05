var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'admin_intranet',
	password:'2445666seba.-',
	database:'intranet',
	multipleStatements: true
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

/*connection.end( () =>{
	console.log('Connection closed!')
});*/

module.exports = connection;