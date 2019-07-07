import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Mutation } from 'react-apollo'
import { POST_TWEET_MUTATION } from '../constents/gqlQueries'
import { toggleShowPostAction } from '../redux/actions';

const PostTweet = () => {
    const [tweetContent, setTweetContent] = useState('');
    const showPostTweet = useSelector(state => state.showPostTweet);
    const dispatch = useDispatch();
    const toggleShowPostTweet = () => dispatch(toggleShowPostAction());

    /**
     * This function is to toggle post a new tweet view.
     */
    const performCancelClick = () => {
        toggleShowPostTweet();
    }

    return (
        <span className={showPostTweet ? '' : 'noDisplay'}>
            <Mutation mutation={POST_TWEET_MUTATION}>
                {(postTweet, { data }) => (
                    <div className='PostTweet'>
                        <div key="tweetEditor" id="tweetEditor" className="tweetEditor"
                            onKeyUp={(evt) => { setTweetContent(evt.target.innerText) }} contentEditable="true"
                            suppressContentEditableWarning={true}>
                        </div>
                        <div className="actionbar">
                            <span className={tweetContent.length > 140 ? 'exceedLimit' : ''}>{140 - tweetContent.length}</span>
                            <Button color="secondary" onClick={() => performCancelClick()} outline>Cancel</Button>
                            <Button color="primary" disabled={(140 - tweetContent.length) <= 0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    postTweet(
                                        {
                                            variables: { status: tweetContent }
                                        }
                                    );
                                    toggleShowPostTweet();
                                    // Clear tweet content
                                    document.getElementById('tweetEditor').innerHTML = '';
                                }}
                            >Post</Button>
                        </div>
                    </div>
                )}
            </Mutation>
        </span>
    );
};

export default PostTweet;