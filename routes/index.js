
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('customers', { page_title: 'Hello World' });
};
