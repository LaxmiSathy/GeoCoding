var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');
var rp = require('request-promise');

router.route("/").get(function (req, res) {
  console.log('am happy to be here')
  res.send("Hello world from Laxmi Sathy. Geocoding API Project")
})

router.route("/get_articles").get(function (req, res) {
  console.log("Get articles");
  //Fetch all rows from table - article
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 0,
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          '*'
        ]
      }
    })
  }
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    res.json(JSON.parse(body))
  })
})


module.exports = router;
