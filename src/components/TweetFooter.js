import React from 'react';
import { Mutation } from 'react-apollo'
import { FAVORITE_TWEET_MUTATION, RE_TWEET_MUTATION} from '../constents/gqlQueries';
const TweetFooter = (tweet) => {

    return (
        <div className="TweetFooter">
            <div>
            <i className="fa fa-comment notImplemented"></i>
            <Mutation mutation={RE_TWEET_MUTATION}>
            {(re, {data}) => (        
            <i className={tweet.retweeted?'fa fa-retweet actionDone':'fa fa-retweet'}
            onClick={(e) => {
                e.preventDefault();
                re({
                    variables: {id: tweet.id_str, action: tweet.retweeted}
                });
            }}>{tweet.retweet_count}</i>  

             )}</Mutation>
            <Mutation mutation={FAVORITE_TWEET_MUTATION}>
            {(favorite, {data}) => (        
            <i className={tweet.favorited?'fa fa-heart actionDone':'fa fa-heart'}
            onClick={(e) => {
                e.preventDefault();
                favorite({
                    variables: {id: tweet.id_str, action: tweet.favorited}
                });
            }}>{tweet.favorite_count}</i>

            )}</Mutation>
            </div>
        </div>
        );
};

export default TweetFooter;