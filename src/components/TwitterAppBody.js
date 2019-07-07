import React from 'react';
import RenderTweet from './RenderTweet';
import PostTweet from './PostTweet';

const TwitterAppBody = (props) => {
    

    return (
        <div className="TwitterAppBody">
            <PostTweet></PostTweet>
            <div>Total Number of tweets = {props.tweets.length}</div>
            <ul className="tweetsContainer">
                {
                    props.tweets.map(tweet => {
                        return RenderTweet(tweet);
                    })
                }
            </ul>
        </div>
    );
};
export default TwitterAppBody;