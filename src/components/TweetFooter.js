import React from 'react';
import { Mutation } from 'react-apollo'
import { FAVORITE_TWEET_MUTATION, RE_TWEET_MUTATION } from '../constents/gqlQueries';
const TweetFooter = (props) => {

    return (
        <div className="TweetFooter">
            <div>
                <i className="fa fa-comment notImplemented"></i>
                <Mutation mutation={RE_TWEET_MUTATION}>
                    {(re, { data }) => (
                        <i className={props.tweet.retweeted ? 'fa fa-retweet actionDone' : 'fa fa-retweet'}
                            onClick={(e) => {
                                e.preventDefault();
                                re({
                                    variables: { id: props.tweet.id_str, action: props.tweet.retweeted }
                                });
                            }}>{props.tweet.retweet_count}</i>

                    )}</Mutation>
                <Mutation mutation={FAVORITE_TWEET_MUTATION}>
                    {(favorite, { data }) => (
                        <i className={props.tweet.favorited ? 'fa fa-heart actionDone' : 'fa fa-heart'}
                            onClick={(e) => {
                                e.preventDefault();
                                favorite({
                                    variables: { id: props.tweet.id_str, action: props.tweet.favorited }
                                });
                            }}>{props.tweet.favorite_count}</i>

                    )}</Mutation>
            </div>
        </div>
    );
};

export default TweetFooter;