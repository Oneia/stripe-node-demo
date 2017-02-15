var express = require('express');
var stripe = require("stripe")("sk_test_7z5TfNhBo7VW9xOfzUtONAcT");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var data = '';

var site = '';
var channelMy = '';

//подключаем папку и главную к сервере
app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + 'index.html');
});

//Обработка пост запроса
app.post('/stripe', function (request, res){
    var b = res;
    var token = request.body.stripeToken; 
    // var charge = stripe.charges.create({
    //   amount: 1000,
    //   currency: "usd",
    //   description: "Example charge",
    //   source: token,
    // }, function(err, charge) {
    //   console.log(charge)
    // });
    // // var plan = stripe.plans.create({
    //       name: "Basic Plan",
    //       id: "basic-monthly",
    //       interval: "month",
    //       currency: "usd",
    //       amount: 0,
    //     }, function(err, plan) {
    //       // asynchronously called
    //     });
    // var customer = stripe.customers.create({
    //   email: "jenny.rosen@example.com",
    // }, function(err, customer) {
    //   // asynchronously called
    // });

    // stripe.subscriptions.create({
    //   customer: customer.id,
    //   plan: "basic-monthly",
    // }, function(err, subscription) {
    //   // asynchronously called
    // });
    var token = request.body.stripeToken; // Using Express

// Create a Customer:
stripe.customers.create({
  email: "paying.user@example.com",
  source: token,
}).then(function(customer) {
  // YOUR CODE: Save the customer ID and other info in a database for later.
  return stripe.charges.create({
    amount: 1000,
    currency: "usd",
    customer: customer.id,
  });
}).then(function(charge) {
    console.log(charge)
  // Use and save the charge info.
});

// YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
// stripe.charges.create({
//   amount: 1500, // $15.00 this time
//   currency: "usd",
//   customer: customerId,
// });

});
app.listen(8080);
console.log('Express server listening on port 8080');