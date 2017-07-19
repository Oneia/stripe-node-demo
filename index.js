const express = require('express');
const stripe = require("stripe")("sk_test_7z5TfNhBo7VW9xOfzUtONAcT");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + 'index.html');
});

app.use( (req, res, next) => {  
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
 }); 

app.post('/stripe', (request, res) => {
console.log(request.token)
console.log(request.body.stripeToken)
    // step one - get token     
    // const token = request.body.subscribtion.id;    
    // const email = request.body.subscribtion.email;
    // const amount = request.body.subscribtion.amount; 
    // console.log( request.body.subscribtion, 'asg   s  ss    sg')

    stripe.customers.create({
      email: request.body.stripeEmail,
      source: request.body.stripeToken,
    }).then(function(customer) {
          // YOUR CODE: Save the customer ID and other info in a database for later.
          return stripe.charges.create({
            amount: 1000,
            currency: "usd",
            customer: customer.id,
          });
        }).then(function(charge) {
          // Use and save the charge info.
          console.log(charge.source.brand)
          console.log(charge.source['last4'])
        });   

});
app.listen(8080);
console.log('Express server listening on port 8080');
