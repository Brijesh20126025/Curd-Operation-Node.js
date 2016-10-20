
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var errorHandler = require('errorhandler');
//load customers route
var customers = require('./routes/customers'); 
var app = express();
var bodyparser = require('body-parser');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var router = express.Router();
var url = require("url");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password :'mysql',
        port : 3306, //port mysql
        database:'brijesh'

    },'pool') //or single

);


app.get('/', customers.list);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);
app.get('/customers/userslist',customers.all_userslist);
app.post('/customers/edit-userdetails/',customers.save_editdeatils);
app.post('/customers/add-userdetails',customers.save_userdetails);
app.get('/customers/check-userdetails',customers.checkuserdetails);
app.get('/customers/delete-userdetails',customers.delete_user);

//app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
