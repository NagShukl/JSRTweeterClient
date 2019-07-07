const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const Twitter = require('twitter');
const config = require('./config.js');
const cors = require('cors');
const client = new Twitter(config);

var port = process.env.PORT || 5000;
const app = express();

const tweets = [];
// allow cross origin
app.use(cors());
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    type TweeterUser {
        id: ID
      id_str: String!
      name: String!
      screen_name: String!
      location: String
      description: String
      url: String
      protected: Boolean
      followers_count: Int
      friends_count: Int
      listed_count: Int
      created_at: String
      favourites_count: Int
      utc_offset: String
      time_zone: String
      geo_enabled: String
      verified: Boolean
      statuses_count: Int
      lang: String
      contributors_enabled: Boolean
      is_translator: Boolean
      is_translation_enabled: Boolean
      profile_background_color: String
      profile_background_image_url: String
      profile_background_image_url_https: String
      profile_background_tile: Boolean
      profile_image_url: String
      profile_image_url_https: String
      profile_banner_url: String
      profile_link_color: String
      profile_sidebar_border_color: String
      profile_sidebar_fill_color: String
      profile_text_color: String
      profile_use_background_image: Boolean
      has_extended_profile: Boolean
      default_profile: Boolean
      default_profile_image: Boolean
      following: Boolean
      follow_request_sent: Boolean
      notifications: Boolean
      translator_type: String
    }
        type Tweet {
            created_at: String!
          id: ID!
          id_str: String!
          text: String!
          truncated: Boolean         
          source: String
          user: TweeterUser
          in_reply_to_status_id: String
          in_reply_to_status_id_str: String
          in_reply_to_user_id: String
          in_reply_to_user_id_str: String
          in_reply_to_screen_name: String         
          geo: String
          coordinates: String
          place: String
          contributors: String
          is_quote_status: Boolean
          retweet_count: Int
          favorite_count: Int
          favorited: Boolean
          retweeted: Boolean
          possibly_sensitive: Boolean
          lang: String
        }
        input TweetInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        type RootQuery {
            tweets(url: String): [Tweet!]!
            searchTweets(url: String): [Tweet!]!
        }
        type RootMutation {
            createTweet(status: String): String
            favoriteTweet(id: String, action: Boolean): String
            reTweet(id: String, action: Boolean): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      tweets: (url) => {
        return jsrTweet(url.url);
      },
      searchTweets: (url) => {
        return jsrTweetSearch(url.url);
      },
      createTweet: args => {
          return jsrCreateTweet(args.status);
      },
      favoriteTweet: args => {
        return jsrFavoriteTweet(args.id, args.action);
      },
      reTweet: args => {
        return jsrReTweet(args.id, args.action);
      }
    },
    graphiql: true
  })
);
const jsrReTweet = (id, action) => {
  return new Promise((resolve, reject) => {
    let url = 'statuses/'+(!action?'retweet':'unretweet')+'/'+id;
    client.post(url, (err, response) => {
            if(err){
              console.log(err);
              reject('Error: Re Tweet '+err);
              return;
            }
          resolve(`Tweet ReTweeted/UnRetweeted successfully!! user=${response.user.screen_name}, id=${response.id_str}`);
          });
  
  });
}
const jsrFavoriteTweet = (id, action) => {
  return new Promise((resolve, reject) => {

  let url = 'favorites/'+(!action?'create':'destroy');
  client.post(url, { 'id': id }, (err, response) => {
          if(err){
            console.log(err[0].message);
            reject('Error: favorite Tweet '+err);
            return;
          }
          resolve(`Tweet favorited/unfavorited successfully!! user=${response.user.screen_name}, id=${response.id_str}`);
        });
  });
}
const jsrCreateTweet = (status) => {
  return new Promise((resolve, reject) => {
    client.post('statuses/update', {"status": status}, (err, data, response) => {
      // If there is no error, proceed
      if (err) {
        reject('Error, While posting tweet : '+err);
      }
      resolve('Your tweet posted successfully!');
    });
  });
}
// jsrTweetSearch
const jsrTweetSearch = (url) => {
  const params = {
    q: url,
    count: 10,
    result_type: 'recent',
    lang: 'en'
  }
  return new Promise((resolve, reject) => {
    client.get('search/tweets', params, (err, data, response) => {
      // If there is no error, proceed
      if (err) {
        console.log('aa: ', err);
        reject([]);
      }
      resolve(data.statuses);
    });
  });
}

const jsrTweet = (url) => {
  return new Promise((resolve, reject) => {
    client.get(url, function (error, tweets_local, response) {
      if (!error) {
       resolve(tweets_local);
      } else {
        console.log('Inside ELSE,...',error);
        reject([]);
      }
    });
  });
}


app.listen(port, function () {
  console.log('Server started on port: ' + port);
});
