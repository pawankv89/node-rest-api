var express = require('express');
var app = express();
var fs = require("fs");
const cors = require('cors');
const bodyParser = require('body-parser'); // This is required for body request

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
var products = [];

var server = app.listen(8082, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})

// Products List
//http://127.0.0.1:8082/products
app.get('/products', function (req, res) {

    console.log( products );
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify(products));  
})

// Get Product based on Id
//http://127.0.0.1:8082/products/1
app.get('/products/:id', function (req, res) {

    var matched = products.filter( u => u.id === req.params.id);
    console.log( req.params );
    console.log( matched );
    if(matched.length > 0) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(matched[0]));
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('Product not found'));
    }
})

// Add Product
// http://127.0.0.1:8082/addproduct
app.post('/addproduct', function (req, res) {

    const body = req.body;
    console.log( body );
    products.push(body);
    
    // Content Type: application/json
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify(products));    
})
    

// Update Product
// http://127.0.0.1:8082/updateproduct/1
app.put('/updateproduct/:id', function (req, res) {
   
    const body = req.body;
    console.log( body );

    var index = products.map( function(u) { return u.id; }).indexOf(req.params.id);
    console.log( body );
    var productMatched = products[index];
    productMatched.name = body.name;
    productMatched.price = body.price;
    products[index] = productMatched;
   
    // Content Type: application/json
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify(products));    
})

// Update as Patch Product
// http://127.0.0.1:8082/updatepatch/1
app.patch('/updatepatch/:id', function (req, res) {

    const body = req.body;
    console.log( body );

    var index = products.map( function(u) { return u.id; }).indexOf(req.params.id);
    console.log( body );
    var productMatched = products[index];
    if(body.name){
        productMatched.name = body.name;
    }
    if(body.price){
        productMatched.price = body.price;
    }
    products[index] = productMatched;
   
    // Content Type: application/json
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify(products));    
})



// Delete Product by Id
//http://127.0.0.1:8082/delete/1
app.delete('/delete/:id', function (req, res) {

var index = products.map( function(u) { return u.id; }).indexOf(req.params.id);

products.splice(index, 1);
 
console.log( products );
// Content Type: application/json
res.writeHead(200, {'Content-Type': 'application/json'});
res.end( JSON.stringify(products));
})


// Delete All Products
//http://127.0.0.1:8082/deleteall
app.delete('/deleteall', function (req, res) {
     
    products.splice(0, products.length);
     
    console.log( products );
    // Content Type: application/json
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify(products));
})