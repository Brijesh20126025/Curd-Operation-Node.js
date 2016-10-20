var url  = require('url');
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Node.js CRUD",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.all_userslist=function(req,res){

	req.getConnection(function(err,connection){
		var query=connection.query('SELECT * FROM customer',function(err,rows){
			if(err)
			console.log("Error Slecting : %s", err);
			res.send(rows);		
		});
	});
};



exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    console.log("Id " +id);
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};



/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone, 
	    password : input.password	
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_userdetails = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone, 
	    password : input.password	
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err) {
          res.send({status: 1, message: 'Failure'});
        } else {
          res.send({status: 0, message: 'Succes'});
        }
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};


exports.checkuserdetails=function(req,res){

	 var url_parts =url.parse(req.url,true).query;
			
	var username=url_parts.name;
	var password=url_parts.password;

	
		console.log('username is  '+username);
		console.log('password is   '+password);
	
	req.getConnection(function(err,connection){
		var query=connection.query("SELECT * FROM customer WHERE name= ? and password=? ",[username,password],function(err,rows){
			
			if(err){
			      res.send({status:1,message:'Failure'});				
			}	
				
			if(rows.length!=0){
				res.send({status:1,message:'Data exist'});
			}else{
				res.send({status:2,message:'Data is not exist'});			
			}
			
		});
	});

};


exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone, 
            password : input.password	
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};

exports.save_editdeatils=function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = input.id;
    	
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone, 
            password : input.password	
        };
       
       var query= connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {

	
          if (err) {
          res.send({status: 1, message: 'Updation failed'});
        }	
		
		if(rows.affectedRows!=0){
				res.send({status:1,message:'Updated Sucess'});
			}else{
				res.send({status:2,message:'Updation is failed'});			
			}
          
        });
    
    });

};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};


exports.delete_user=function(req,res){
var url_parts =url.parse(req.url,true).query;

var id=url_parts.id;

req.getConnection(function(err,connection){
	connection.query("DELETE FROM customer WHERE id=?",[id],function(err,rows){
	
	if (err) {
          res.send({status: 0, message: 'Deletion failed'});
        } if(rows.affectedRows!=0){
				res.send({status:1,message:'Sucess'});
			}else{
				res.send({status:2,message:'failed'});			
			}
	
	});
	
});

};


