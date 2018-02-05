var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('request-debug')(request);

var hasuraExamplesRouter = require('./hasuraExamples');

var server = require('http').Server(app);

var axios = require('axios');

router.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', hasuraExamplesRouter);

app.get('/api/:source/:destination', function(req,res){
  var source = req.params.source;
  var destination = req.params.destination;
  axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: source,
          destination: destination,
          key: 'AIzaSyCLdlqDqHnZBXq45hyrJ2o5ptRlxU3BhD8'
        }
      })
  .then(function(response){
    //console log and send the distance data
    var status = response.data.status;
    
    if(status == 'OK'){
      var duration = response.data.routes[0].legs[0].duration.text;
      var distance = response.data.routes[0].legs[0].distance.text;
      var routeText = '';
      for (var i=0; i<response.data.routes[0].legs[0].steps.length; i++){
        routeText += response.data.routes[0].legs[0].steps[i].html_instructions+'<br>';

      }
      //console.log('Distance is '+ distance);
      //console.log('Duration is '+ duration);
      var directionString = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyCLdlqDqHnZBXq45hyrJ2o5ptRlxU3BhD8&origin='+source+'&destination='+destination;
      var data = {'status': status, 'directionString': directionString,'distance':distance, 'duration':duration, 'route': routeText};
      //console.log(data);
      res.send(data);
    }
    else if(status == 'ZERO_RESULTS'){
      var err ={'status': status, 'message': 'No route between source and destination'};
      res.send(err);
    } else if (status == 'NOT_FOUND') {
      var err ={'status': status, 'message': 'Location cannot be geocoded'};
      res.send(err);

    } else if (status == 'INVALID_REQUEST') {
      var err ={'status': status, 'message': 'Missing source or destination, please enter again'};
      res.send(err);

    }

  })

  .catch(function(error){
    console.log(error);
    
  });
  
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
