import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector  } from 'react-redux';
import { switchTweetTypeAction, loadTweetsAction, toggleShowPostAction } from '../redux/actions';

const PostTweet = (props) => {
    const [tweetContent, setTweetContent] = useState('');
    const showPostTweet = useSelector( state => state.showPostTweet);
    const dispatch = useDispatch();
    const toggleShowPostTweet = () => dispatch(toggleShowPostAction());
    
    /**
     * This function is to toggle post a new tweet view.
     */
   const performCancelClick = () => {
    toggleShowPostTweet();
   }
   /**
    * This method is to delegate Post tweet action to parent component.
    */
   const performPostClick = () => {
    console.log('**JSR,..performPostClick,... ');
    props.performPostTweet(tweetContent);
    // After posting tweet - Close post Tweet view.
    toggleShowPostTweet();
    // Clear tweet content
    document.getElementById('tweetEditor').innerHTML = '';
}
    return (
        <span className={showPostTweet?'':'noDisplay'}>
            <div className='PostTweet'>
            <div key="tweetEditor" id="tweetEditor" className="tweetEditor" onKeyUp={(evt) => {setTweetContent(evt.target.innerText)}} contentEditable="true" suppressContentEditableWarning={true}>
            </div>
            <div className="actionbar">
                <span className={tweetContent.length>140?'exceedLimit':''}>{140 - tweetContent.length}</span>
                <Button color="secondary" onClick={() => performCancelClick()} outline>Cancel</Button>
            <Button color="primary" onClick={() => performPostClick()} disabled={(140 - tweetContent.length) <= 0}>Post</Button>
            </div>
            </div>
        </span>
    );
};
export default PostTweet;