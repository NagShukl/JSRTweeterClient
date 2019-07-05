const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);

const app = express();
app.use(cors());
// var app = express();
var port = process.env.PORT || 4000;

// var routes = require('./api/routes');

// routes(app);
app.get('/gettweets', function (req, res) {
  console.log(req.query.urlpattern);
  let url = req.query.urlpattern;
  //urlpattern=favorites/list
  client.get(url, function(error, tweets, response) {
    if (!error) {
      console.log(tweets.length);
      res.json(tweets);
    }
  });
 
});

app.listen(port, function() {
   console.log('Server started on port: ' + port);
});



// // Set up your search parameters
// const params = {
//   q: '#nodejs',
//   count: 10,
//   result_type: 'recent',
//   lang: 'en'
// }
// T.post('statuses/update', {status: 'Jai Shri Ram!! This tweet is from an App i am testing!'},  function(error, tweet, response) {
//     if(error) throw error;
//     console.log(tweet);  // Tweet body.
//     console.log(response);  // Raw response object.
//   });

// // Initiate your search using the above paramaters
// T.get('search/tweets', params, (err, data, response) => {
//   // If there is no error, proceed
//   if(err){
//     return console.log('aa: ',err);
//   }

//   // Loop through the returned tweets
//   const tweetsId = data.statuses
//     .map(tweet => ({ id: tweet.id_str }));

//   tweetsId.map(tweetId => {
//     T.post('favorites/create', tweetId, (err, response) => {
//       if(err){
//         return console.log(err[0].message);
//       }

//       const username = response.user.screen_name;
//       const favoritedTweetId = response.id_str;
//       console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);

//     });
//   });
// })