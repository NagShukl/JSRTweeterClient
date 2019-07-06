import React from 'react';

const TweetFooter = (tweet, onTweetAction) => {
    const performTweetAction = (action) => {
        alert(action);
        onTweetAction(action,tweet.id_str);
    }
    return (
        <div className="TweetFooter">
            <div>
            <i className="fa fa-comment notImplemented"></i>
            <i className={tweet.retweeted?'fa fa-retweet actionDone':'fa fa-retweet'}
            onClick={() => performTweetAction('RETWEET')}>{tweet.retweet_count}</i>          
            <i className={tweet.favorited?'fa fa-heart actionDone':'fa fa-heart'}
            onClick={() => performTweetAction('FAVOTIE')}>{tweet.favorite_count}</i>
            
            </div>
        </div>
        );
};
export default TweetFooter;