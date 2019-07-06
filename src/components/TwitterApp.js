import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TwitterAppHeader from './TwitterAppHeader'
import TwitterAppBody from './TwitterAppBody'
import AppConstents from '../constents/AppConstents';
import { useDispatch, useSelector  } from 'react-redux';
import { switchTweetTypeAction, loadTweetsAction, toggleShowPostAction } from '../redux/actions';

const TwitterApp = () => {
// to get state form store
  const tweets = useSelector( state => state.tweets);
  const selectedTweetType = useSelector( state => state.selectedTweetType);
  // const [showPostTweet, toggleShowPostTweet] = useState(false);
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
    getTweetsForSelectedType();
  }, [selectedTweetType]);
  
  const getTweetsForSelectedType = () => {
    axios.get(AppConstents.getFetchTweetUrlFor(selectedTweetType)).then(response => response.data)
      .then((data) => {
        loadTweets(data);
        // <NS_TODO>Should clear search box,...
        console.log('Got the response as,...', data);
      }).catch(err => {
        alert('Got error!!'+err);
        // **JSR_NS_TO_DO use mock data to render tweets here.
      })
  };

  const performTweetTypeSelect = (selectedType) => {
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
    alert('handlePostTweetAction,...from twitter App,...Make an API call to post :: '+tweetContent);
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
  alert('performSearchAction,...from twitter App,...Make an API call to search for :: '+key);
  axios.post('http://localhost:4000/searchtweets', {q:key}).then(response => response.data)
      .then((data) => {
        loadTweets(data);
        console.log('Got the response as,...', data);
      }).catch(err => {
        alert('Got error!!');
        // **JSR_NS_TO_DO use mock data to render tweets here.
      })
}

  return (
        <div className="TwitterApp">
          <TwitterAppHeader selectedTweetType={selectedTweetType}
        onTweetTypeSelect={performTweetTypeSelect} postClickAction={performPostClickAction}
        onSearch={performSearchAction}></TwitterAppHeader>
        <TwitterAppBody tweets={tweets} showPostTweet={showPostTweet}
        postTweetAction={handlePostTweetAction}></TwitterAppBody>
      
      
    </div>
  );
};


export default TwitterApp;
