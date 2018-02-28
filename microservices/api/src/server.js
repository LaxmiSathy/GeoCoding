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

app.get('/directions', function(req,res){
  
  var source = req.query.source;
  var destination = req.query.destination;
  var mode = req.query.mode;
  
  axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: source,
          destination: destination,
          alternatives: 'true',
          mode: mode,
          key: process.env.GOOGLE_MAPS_API
        }
      })
  .then(function(response){
    //console log and send the distance data
    var status = response.data.status;
    
    if(status == 'OK'){
      var dataObj = {};
      var result = 'ResultOutput';
      dataObj[result] =[];

      for (var j=0; j<response.data.routes.length; j++) {
          var duration = response.data.routes[j].legs[0].duration.text;
          var durationFormat = 'P'+duration.replace(/da\w+/,'D').replace(/hou\w+/,'H').replace('mins','M').replace(/\s/g,'');
          var distance = response.data.routes[j].legs[0].distance.text;
          var routeText = {};
          var routeResult = 'route';
          routeText[routeResult]=[];

          for (var i=0; i<response.data.routes[j].legs[0].steps.length; i++){
            routeText[routeResult].push(response.data.routes[j].legs[0].steps[i].html_instructions);
          }
          
          var directionString = 'https://www.google.com/maps/embed/v1/directions?key='+process.env.GOOGLE_MAPS_API+'&origin='+source+'&destination='+destination+'&mode='+mode;
          var data = {'status': status, 'directionString': directionString,'distance':distance, 'duration':duration, 'durationFormat':durationFormat, 'route': routeText[routeResult]};
          //console.log(data);
          dataObj[result].push(data);
          
      }
      res.send(dataObj);
      
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
