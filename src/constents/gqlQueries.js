import gql from 'graphql-tag'
import AppConstents from './AppConstents';

export const FAVORITE_TWEET_MUTATION = gql`
mutation favoriteTweet($id: String!, $action: Boolean){
    favoriteTweet(id: $id, action: $action)
}
`;
export const RE_TWEET_MUTATION = gql`
mutation reTweet($id: String!, $action: Boolean){
    reTweet(id: $id, action: $action)
}
`;

export const POST_TWEET_MUTATION = gql`
mutation createTweet($status: String!){
    createTweet(status: $status)
}
`;
export const getGraphQLQuery = (type, executeSearch) => {
  let url = 'favorites/list';
  // If executeSearch is true ==> Means we need to perform Query for Search.
  // otherwise get Query for Tweet list of type provided.
  url = AppConstents.getUrlpatternForTweetType(type);
  console.log('**JSR,...getGraphQLQuery: ', type);
  const timeLineTweetTypeQuery = gql`
    query {
      tweets (url: "${url}") {
        text
        id
        id_str
        retweet_count
        favorite_count
        retweeted
        favorited
        user {
          name
          screen_name
          profile_image_url
          location
        }
      }
    }
    `;
  const searchTweetQuery = gql`
    query {
      searchTweets (url: "${executeSearch.searchKey}") {
        text
        id
        id_str
        retweet_count
        favorite_count
        retweeted
        favorited
        user {
          name
          screen_name
          profile_image_url
          location
        }
      }
    }  
    `;
  if (executeSearch.isSearch) {
    return searchTweetQuery;
  } else
    return timeLineTweetTypeQuery;
}