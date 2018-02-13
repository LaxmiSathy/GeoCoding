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

//select users based on username
router.route("/user_only").get(function (req, res) {
  console.log("Show User list");
  //Fetch a row from table - sp_user
  var uname = req.param('name');
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
            'username': {
                '$eq': uname
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

// Add Group end point
router.route("/add_group").get(function (req, res) {
  console.log("Group Add");
  //Get params group name, bill amount, user name array
  var usernames = req.query.uname;
  var grpname = req.query.groupname;
  var bill = req.query.bill;

  //Post request for insert query - table sp_group
  var option1 = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 1,
      'X-Hasura-Role': 'admin'
    },
    body: JSON.stringify({
      'type': 'insert',
      'args': {
        'table': 'sp_group',
        "objects": [
            {
                "bill": bill,
                "groupname": grpname
            }
        ]       
      }
    })
  }

  // methods on request call object - option1
  rp(option1)
    .then(function(response){
      console.log(response);
      //res.send(response);
      //option2 - select group id  from sp_group
        var option2 = {
          url: config.projectConfig.url.data,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Hasura-User-Id': 1,
            'X-Hasura-Role': 'admin'
          },
          body: JSON.stringify({
            'type': 'select',
            'args': {
              'table': 'sp_group',
              'columns': [
                'group_id'
              ],
              'where': {
                  'groupname': {
                      '$eq': grpname
                  }
              }
            }
          })
        }
        //method call for option2 rp
        rp(option2)
        .then (function(response){
          console.log(response);
          console.log(response.group_id);

        })
        .catch(function(error){

        });
        // End of option2 then catch function


      //end of option1 then function
    })
    .catch(function(error){
      console.log(error);
      res.send(error);
    });
  
})





module.exports = router;
