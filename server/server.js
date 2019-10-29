require('dotenv').config()

const express = require('express');
const request = require('request');
var cors = require('cors');

const API_PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY || "NULL";
const app = express();


// ############################ ROUTES ##################################

app.get("/search", (req, res) => {
    const params = req.query;

    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    request({
        url:'http://api.marketcheck.com/v1/search?api_key=' + API_KEY + '&' + queryString,
        method: 'GET',
        headers:{
            Host:'marketcheck-prod.apigee.net'
        }
    }, function(error, response, body){
        if (error) res.status(400).json({response: response, body: body});
        else res.status(200).json({response: response, body: body});
    });
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
