import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import RenderTweet from './components/RenderTweet';
import TwitterSelect from './components/TwitterSelect'
import AppConstents from './constents/AppConstents';

function App() {
  const [tweets, setTweets] = useState([]);
  const [selectedTweetType, setSelectedTweetType] = useState(AppConstents.tweet_types[0].type_key);

  useEffect(() => {
    // make an API call to load twittes
    console.log('**JAI Shri Ram!! useEffect making call to get data');
    getTweetsForSelectedType();
  }, [selectedTweetType]);

  const getTweetsForSelectedType = () => {
    axios.get(AppConstents.getFetchTweetUrlFor(selectedTweetType)).then(response => response.data)
      .then((data) => {
        setTweets(data);
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


export default App;
