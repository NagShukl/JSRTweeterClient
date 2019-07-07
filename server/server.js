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
          title: String
          _id: String
          description: String!
          price: Float!
          date: String!
        }
        input TweetInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        type RootQuery {
            tweets(url: String): [Tweet!]!
        }
        type RootMutation {
            createTweet(tweetInput: TweetInput): Tweet
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        tweets:  (url) => {
              const res = jsrTweet(url.url);   
              console.log('**JSR,..returning from main resolver '+res);  
              return res;
      },
      createTweet: args => {
        //   console.log('**JSR,...'+args.)
        const tweet = {
          _id: Math.random().toString(),
          title: args.tweetInput.title,
          description: args.tweetInput.description,
          price: +args.tweetInput.price,
          date: args.tweetInput.date
        };
        tweets.push(tweet);
        return tweet;
      }
    },
    graphiql: true
  })
);
const jsrTweet = (url) => {
    console.log('**JSR jsrTweet is called with : '+url);
    return new Promise((resolve, reject) => {
        client.get(url, function (error, tweets_local, response) {
            if (!error) {
                console.log('**JSR,..Rqturing resolve,..from callback '+tweets_local.length);
                const res = [];
                for(let i = 0; i < tweets_local.length; i++) {
                    // res.push(
                    //    const abc =  {
                        tweets_local[i]._id= "1111",
                        tweets_local[i].title= "**JSR title _ "+i,
                        tweets_local[i].description= "**JSR desc,..._"+i,
                        tweets_local[i].price=  19.90,
                        tweets_local[i].date= "213213123"
                    // }
                    // );
                   // tweets_local[i] = {...tweets_local[i],abc};

                    console.log('==> '+tweets_local[i].title+' : '+tweets_local[i]._id);
                }
                //const final = [...tweets, res];
                console.log('final return '+tweets_local.length);
                resolve(tweets_local);
            }else {
                console.log('Inside ELSE,...');
                resject([]);
            }
            
        });
    });
}


app.listen(port, function () {
    console.log('Server started on port: ' + port);
  });
