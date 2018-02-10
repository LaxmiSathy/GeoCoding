var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

router.route("/").get(function (req, res) {
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

//Splitwise Project End points

//Shows the list of users and their amount due
router.route("/show_users").get(function (req, res) {
  console.log("Show User list");
  //Fetch all rows from table - articles
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 3,
      'X-Hasura-Role': 'user'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'sp_user',
        'columns': [
          'user_id',
          'username',
          'amount'
        ],
        'order_by': [
            {
                'column': 'user_id',
                'order': 'asc'
            }
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

//select users based on user id
router.route("/user_only").get(function (req, res) {
  console.log("Show User list");
  //Fetch a row from table - sp_user
  var uid = req.param('id');
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 3,
      'X-Hasura-Role': 'user'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'sp_user',
        'columns': [
          'user_id',
          'username',
          'amount'
        ],
        'where': {
            'user_id': {
                '$eq': uid
            }
        }
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
