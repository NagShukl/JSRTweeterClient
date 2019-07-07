import React from 'react';
import RenderTweet from './RenderTweet';
import PostTweet from './PostTweet';

const TwitterAppBody = (props) => {
    const handlePostTweetAction = (tweetContent) => {
        props.postTweetAction(tweetContent);
    }
    const onTweetAction = (action) => {
        props.onTweetAction(action);
    }
    return (
        <div className="TwitterAppBody">
            <PostTweet performPostTweet={handlePostTweetAction}></PostTweet>
            
            
            <div className="topInfo">Total Number of tweets = {props.tweets.length}</div>
        <ul className="tweetsContainer">
        {
           
            props.tweets.map(tweet => {
                  return RenderTweet(tweet,onTweetAction);
                })
             
        }
           </ul>
        </div>
    );
};
export default TwitterAppBody;