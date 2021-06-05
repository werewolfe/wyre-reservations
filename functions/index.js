const functions = require('firebase-functions');
const axios = require('axios');
const CryptoJS = require('crypto-js');

const WyreURL = "https://api.testwyre.com";

// Your Wyre account id goes here
const WyreAccount = "AC_Y22RAQXEYV6";

// See https://firebase.google.com/docs/functions/config-env to set the functions config
const WYRE_KEY = functions.config().wyre.key;
const WYRE_SECRET = functions.config().wyre.secret;

let signature = (data) => {
    let hash = CryptoJS.HmacSHA256(data, WYRE_SECRET);
    console.log(hash)
    return CryptoJS.enc.Hex.stringify(hash);
}

exports.wyreReservation = functions.https.onRequest(async (req, res) => {
    const timestamp = new Date().getTime();
    const fullUrl = `${WyreURL}/v3/orders/reserve?timestamp=${timestamp}`;
    const headers = {};
    const body = {
        paymentMethod: 'debit-card',
        referrerAccountId: WyreAccount,
        sourceAmount: req.body.sourceAmount,
        sourceCurrency: req.body.sourceCurrency,
        destCurrency: req.body.destCurrency,
        amountIncludeFees: false, 
        dest: req.body.dest,
        country: req.body.country ? req.body.country : "US"
    }
    
    const details = fullUrl + JSON.stringify(body);
    
    headers['Content-Type'] = 'application/json';
    headers['X-Api-Key'] = WYRE_KEY;
    headers['X-Api-Signature'] = signature(details);
    
    const response = await axios.post(fullUrl, body, {headers: headers})
    .catch(error => {
        res.send(error.message);
    });
    res.send(response.data);
});
