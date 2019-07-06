import React from 'react';
import TweetHeader from './TweetHeader';
import TweetFooter from './TweetFooter';

const RenderTweet = (tweet, parTweetAction) => {
    const onTweetAction = (action) => {
        parTweetAction(action);
    }
    return (<li key={tweet.id}><div  className='RenderTweet'>
        {/* <TweetHeader user={tweet.user}></TweetHeader>  */}
        {TweetHeader(tweet.user)}
        
        
        {TweetText(tweet)}
   
        {TweetFooter(tweet, onTweetAction)}
        </div> </li>);
}
const TweetText = (tweet) => {
    return (<p>{tweet.hasOwnProperty('full_text')?tweet.full_text:tweet.text}</p>);
}

export default RenderTweet;