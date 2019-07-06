import React from 'react';
import AppConstants from '../constents/AppConstents';

const TweetFooter = (tweet, onTweetAction) => {
    const performTweetAction = (action, subAction) => {
        const res = {};
        res.id = tweet.id_str;
        res.action = action;
        res.subAction = subAction;
        console.log('**JSR,..TweetFooter : performTweetAction : ',res);
        onTweetAction(res);
    }
    return (
        <div className="TweetFooter">
            <div>
            <i className="fa fa-comment notImplemented"></i>
            <i className={tweet.retweeted?'fa fa-retweet actionDone':'fa fa-retweet'}
            onClick={() => performTweetAction(AppConstants.RETWEET, tweet.retweeted)}>{tweet.retweet_count}</i>          
            <i className={tweet.favorited?'fa fa-heart actionDone':'fa fa-heart'}
            onClick={() => performTweetAction(AppConstants.FAVOTIE, tweet.favorited)}>{tweet.favorite_count}</i>
            
            </div>
        </div>
        );
};
export default TweetFooter;