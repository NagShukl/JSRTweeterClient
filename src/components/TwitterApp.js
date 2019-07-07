import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TwitterAppHeader from './TwitterAppHeader'
import TwitterAppBody from './TwitterAppBody'
import AppConstents from '../constents/AppConstents';
import { useDispatch, useSelector  } from 'react-redux';
import { switchTweetTypeAction, loadTweetsAction, toggleShowPostAction } from '../redux/actions';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import JsApiReporter from 'jest-jasmine2/build/jasmine/JsApiReporter';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const TwitterApp = () => {
// to get state form store
  const tweets = useSelector( state => state.tweets);
  const selectedTweetType = useSelector( state => state.selectedTweetType);
  const [executeSearch, doExecuteSearch] = useState({isSearch:false, searchKey:''});
  const showPostTweet = useSelector( state => state.showPostTweet);
  // let showPostTweet = false;

  // use to dispatch action
  const dispatch = useDispatch();
  const loadTweets = (tweets) => dispatch(loadTweetsAction(tweets));
  const setSelectedTweetType = (selectedTweetType) => dispatch(switchTweetTypeAction(selectedTweetType));
  const toggleShowPostTweet = () => dispatch(toggleShowPostAction());

  useEffect(() => {
    // make an API call to load twittes
    console.log('**JAI Shri Ram!! useEffect making call to get data');
      //getTweetsForSelectedType();  
  }, [selectedTweetType, executeSearch]);
  // const getTweetsForSelectedType = () => {
  //   axios.get(AppConstents.getFetchTweetUrlFor(selectedTweetType)).then(response => response.data)
  //     .then((data) => {
  //       loadTweets(data);
  //       // <NS_TODO>Should clear search box,...
  //       console.log('Got the response as,...', data);
  //     }).catch(err => {
  //       alert('Got error!!'+err);
  //       // **JSR_NS_TO_DO use mock data to render tweets here.
  //     })
  // };

  const performTweetTypeSelect = (selectedType) => {
    doExecuteSearch({isSearch:false, searchKey:''});
    setSelectedTweetType(selectedType);
    
  }
const performPostClickAction = (evt) => {
  toggleShowPostTweet();//!showPostTweet);
}
/**
   * This method is to post the tweetContent to the API.
   * @param {tweetContent} tweetContent 
   */
  const handlePostTweetAction = (tweetContent) => {
    // alert('handlePostTweetAction,...from twitter App,...Make an API call to post :: '+tweetContent);
    tweetContent = "**JSR - testing from App - working on! Test 1";
    axios.post('http://localhost:4000/posttweet', {status:tweetContent}).then(response => response.data)
      .then((data) => {
        //loadTweets(data);
        console.log('handlePostTweetAction : Got the response as,...', data);
      }).catch(err => {
        alert('Got error!!'+err);
        // **JSR_NS_TO_DO use mock data to render tweets here.
      })
}

/**
 * This function is to exceupte API call for search tweet.
 * @param {Search Query text} key 
 */
const performSearchAction = (key) => {
  alert('**JSR,...performSearchAction'+key);
  doExecuteSearch({isSearch:true, searchKey:key});
  // // alert('performSearchAction,...from twitter App,...Make an API call to search for :: '+key);
  // axios.post('http://localhost:4000/searchtweets', {q:key}).then(response => response.data)
  //     .then((data) => {
  //       loadTweets(data);
  //       console.log('Got the response as,...', data);
  //     }).catch(err => {
  //       alert('Got error!!');
  //       // **JSR_NS_TO_DO use mock data to render tweets here.
  //     });
}
const handleTweetAction = (action) => {
  console.log('onTweetAction : from TWITTER APP,...make API call,...',action);
  //{ "id": "1146841099853545474", "action":"create" }
  const reqBody = {};
  reqBody.id = action.id;
  reqBody.action = action.subAction;
  let url = (action.action === AppConstents.FAVOTIE) ?'/favoritetweet':'/retweet';
  alert(url);
  console.log('**JSR,...',reqBody);
  console.log('**JSR,...',action);
  axios.post('http://localhost:4000'+url, reqBody).then(response => response.data)
      .then((data) => {
        // loadTweets(data);
        //updateTweetById(action.id, !action.subAction);
       
        console.log('Got the response as,...', data);
      }).catch(err => {
        alert('Got error!! '+err);
        // **JSR_NS_TO_DO use mock data to render tweets here.
      })
}

  return (
    <ApolloProvider client={client}>
      {console.log('**JSR,....Query is being called '+selectedTweetType+' : doExecuteSearch(true)=='+executeSearch)}
      <Query
    query={getGraphQLQuery(selectedTweetType, executeSearch)}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      //  return data.tweets.map((ele) => {
      //    console.log(ele);
      //    return <div>Jai Shri Ram!</div>
      //  });
      let tweets = executeSearch.isSearch? data.searchTweets:data.tweets;
      return (<div className="TwitterApp">
      <TwitterAppHeader selectedTweetType={selectedTweetType}
    onTweetTypeSelect={performTweetTypeSelect} postClickAction={performPostClickAction}
    onSearch={performSearchAction}></TwitterAppHeader>
    <TwitterAppBody tweets={tweets} showPostTweet={showPostTweet}
    postTweetAction={handlePostTweetAction}
    onTweetAction={handleTweetAction}></TwitterAppBody>
  
  
</div>);
     
    }}
        {/* <div className="TwitterApp">
          <TwitterAppHeader selectedTweetType={selectedTweetType}
        onTweetTypeSelect={performTweetTypeSelect} postClickAction={performPostClickAction}
        onSearch={performSearchAction}></TwitterAppHeader>
        <TwitterAppBody tweets={tweets} showPostTweet={showPostTweet}
        postTweetAction={handlePostTweetAction}
        onTweetAction={handleTweetAction}></TwitterAppBody>
      
      
    </div> */}
    </Query>
    </ApolloProvider>
  );
};

const getGraphQLQuery = (type, executeSearch) => {
  let url = 'favorites/list';
 // If executeSearch is true ==> Means we need to perform Query for Search.
 // otherwise get Query for Tweet list of type provided.
  url = AppConstents.getUrlpatternForTweetType(type);
  alert('**JSR,...using url for gql='+url+' : executeSearch='+executeSearch.isSearch+' : '+executeSearch.searchKey);
  console.log('**JSR,...getGraphQLQuery: ',type);
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
  if(executeSearch.isSearch) {
    alert('**JSR,...returning GQL Query, As executeSearch is true - no query yet.');
    return searchTweetQuery;
  }else
    return timeLineTweetTypeQuery;
}
export default TwitterApp;
