const express = require('express');
const stripe = require("stripe")("sk_test_7z5TfNhBo7VW9xOfzUtONAcT");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use( (req, res, next) => {  
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
 }); 

app.post('/stripe', (request, res) => {

    // step one - get token
    const token = request.body.subscribtion.id;
    const email = request.body.subscribtion.email;
    const amount = request.body.subscribtion.amount; 

    stripe.customers.create({
      email: email,
      source: token,
    }).then(function(customer) {
      // YOUR CODE: Save the customer ID and other info in a database for later.
      return    stripe.subscriptions.create({
              customer: customer.id,
              plan: "test",
            }, function(err, subscription) {
              // asynchronously called
               console.log(subscription)
            });
    })   

});
app.listen(8080);
console.log('Express server listening on port 8080');