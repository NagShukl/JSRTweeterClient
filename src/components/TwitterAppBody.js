import React, { useState, useEffect } from 'react';
import RenderTweet from './RenderTweet';
import PostTweet from './PostTweet';

const TwitterAppBody = (props) => {
    const handlePostTweetAction = (tweetContent) => {
        props.postTweetAction(tweetContent);
    }
    return (
        <div className="TwitterAppBody">
            <PostTweet performPostTweet={handlePostTweetAction}></PostTweet>
            
            
        <p>Total Number of tweets = {props.tweets.length} :: {''+props.showPostTweet}</p>
        {
            props.tweets.map(tweet => {
                  return RenderTweet(tweet);
                })
        }
        </div>
    );
};
export default TwitterAppBody;