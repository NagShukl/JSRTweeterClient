const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);

const app = express();
app.use(cors());
app.use(bodyParser.json());
var port = process.env.PORT || 4000;

app.get('/gettweets', function (req, res) {
  let url = req.query.urlpattern;
  client.get(url, function (error, tweets, response) {
    if (!error) {
      console.log(tweets.length);
      res.json(tweets);
      return;
    }
    res.json(error);
  });
});
app.post('/searchtweets', function (req, res) {
  const q = req.body.q;
  const params = {
    q: q,
    count: 10,
    result_type: 'recent',
    lang: 'en'
  }
  // Initiate your search using the above paramaters
  client.get('search/tweets', params, (err, data, response) => {
    // If there is no error, proceed
    if (err) {
      console.log('Error: ', err);
      res.json(err);
    }
    res.json(data.statuses);
  });
});
app.post('/posttweet', function (req, res) {
  // Initiate your search using the above paramaters
  client.post('statuses/update', req.body, (err, data, response) => {
    // If there is no error, proceed
    if (err) {
      console.log('Error: ', err);
      res.json(err);
    }
    res.json(data);
  });
});
app.post('/favoritetweet', function (req, res) {
  const id = req.body.id;
  const action = req.body.action;
  let url = 'favorites/'+(!action?'create':'destroy');
  client.post(url, { 'id': id }, (err, response) => {
          if(err){
            console.log(err[0].message);
            res.json(err);
            return;
          }
    
          const username = response.user.screen_name;
          const favoritedTweetId = response.id_str;
          res.json(response);
        });
});

app.post('/retweet', function (req, res) {
  const id = req.body.id;
  const action = req.body.action;
  let url = 'statuses/'+(!action?'retweet':'unretweet')+'/'+id;
  client.post(url, (err, response) => {
          if(err){
            console.log(err);
            res.json(err);
            return;
          }
    
          const username = response.user.screen_name;
          const favoritedTweetId = response.id_str;
          res.json(response);
        });
});


app.listen(port, function () {
  console.log('Server started on port: ' + port);
});
