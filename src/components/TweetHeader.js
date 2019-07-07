import React from 'react';
const TweetHeader = (props) => {
    return (
        <div className="TweetHeader">
            <img src={props.user.profile_image_url} alt="userImage" />
            <strong>{props.user.name} ({props.user.screen_name})</strong> {props.user.location}
        </div>
    );
};
export default TweetHeader;