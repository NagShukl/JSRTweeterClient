import React from 'react';
import TweetHeader from './TweetHeader';
import TweetFooter from './TweetFooter';

const RenderTweet = (tweet) => {

    return (<li key={tweet.id}><div className='RenderTweet'>
        <TweetHeader user={tweet.user}></TweetHeader>
        {TweetText(tweet)}
        <TweetFooter tweet={tweet}></TweetFooter>
    </div> </li>);
}
const TweetText = (tweet) => {
    return (<p>{tweet.hasOwnProperty('full_text') ? tweet.full_text : tweet.text}</p>);
}

export default RenderTweet;