import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderTweet from './RenderTweet';
import TwitterSelect from './TwitterSelect'
import AppConstents from '../constents/AppConstents';
import { useDispatch, useSelector  } from 'react-redux';
import { switchTweetTypeAction, loadTweetsAction } from '../redux/actions';

const TwitterApp = () => {
// to get state form store
  const tweets = useSelector( state => state.tweets);
  const selectedTweetType = useSelector( state => state.selectedTweetType);

  // use to dispatch action
  const dispatch = useDispatch();
  const loadTweets = (tweets) => dispatch(loadTweetsAction(tweets));
  const setSelectedTweetType = (selectedTweetType) => dispatch(switchTweetTypeAction(selectedTweetType));

  useEffect(() => {
    // make an API call to load twittes
    console.log('**JAI Shri Ram!! useEffect making call to get data');
    getTweetsForSelectedType();
  }, [selectedTweetType]);

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

  const performTweetTypeSelect = (evt) => {
    setSelectedTweetType(evt.target.value);
  }


  return (

    
        <div className="App">
      <TwitterSelect
        selectedTweetType={selectedTweetType}
        onTweetTypeSelect={performTweetTypeSelect}
      />
      <p>Total Number of tweets = {tweets.length}</p>
      {
        tweets.map(tweet => {
          return RenderTweet(tweet);
        })
      }
    </div>
  );
};


export default TwitterApp;
