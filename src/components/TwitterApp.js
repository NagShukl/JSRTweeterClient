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
  /**
   * This method is to post the tweetContent to the API.
   * @param {tweetContent} tweetContent 
   */
  const handlePostTweetAction = (tweetContent) => {
    alert('handlePostTweetAction,...from twitter App,...Make an API call to post :: '+tweetContent);
}
  const getTweetsForSelectedType = () => {
    axios.get(AppConstents.getFetchTweetUrlFor(selectedTweetType)).then(response => response.data)
      .then((data) => {
        loadTweets(data);
        console.log('Got the response as,...', data);
      }).catch(err => {
        alert('Got error!!');
        // **JSR_NS_TO_DO use mock data to render tweets here.
      })
  };

  const performTweetTypeSelect = (selectedType) => {
    setSelectedTweetType(selectedType);
  }
const performPostClickAction = (evt) => {
  toggleShowPostTweet();//!showPostTweet);
}

  return (
        <div className="TwitterApp">
          <TwitterAppHeader selectedTweetType={selectedTweetType}
        onTweetTypeSelect={performTweetTypeSelect} postClickAction={performPostClickAction}
        ></TwitterAppHeader>
        <TwitterAppBody tweets={tweets} showPostTweet={showPostTweet}
        postTweetAction={handlePostTweetAction}></TwitterAppBody>
      
      
    </div>
  );
};


export default TwitterApp;
