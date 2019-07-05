import React, { useState, useEffect } from 'react';
import TweetHeader from './TweetHeader'
const getHashTags = tweet => {
    // if( )
}
const RenderTweet = (tweet) => {
    return (<div key={tweet.id}>
        {/* <TweetHeader user={tweet.user}></TweetHeader>  */}
        {TweetHeader(tweet.user)}
        
        <hr></hr>
        
        {TweetText(tweet)}
      </div>);
}
const TweetText = (tweet) => {
    return (<p>{tweet.hasOwnProperty('full_text')?tweet.full_text:tweet.text}</p>);
}

export default RenderTweet;