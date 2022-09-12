const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment:  braintree.Environment.Sandbox,
  merchantId:   '39s8p3pwrrgk2pf9',
  publicKey:    '3vs8hgwdcxjy24ks',
  privateKey:   '492dd21edd626e4bff54fa78df6e2560'
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, (err, response) => {
      if(err){
        res.status(500).send(err)
      }
      else {
        res.send(response)
      }
      });

}

exports.processMoney = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheCliend= req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheCliend,
        paymentMethodNonce: nonceFromTheClient,
    
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).send(err)
          }
          else {
            res.json(result)
          }
      });
}