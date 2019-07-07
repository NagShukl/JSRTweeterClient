import React from 'react';
const TweetHeader = (props) => {
    return (
        <div className="TweetHeader">
            <img src={props.user.profile_image_url} alt="userImage" />
            <b>{props.user.name}: {props.user.screen_name}: {props.user.location}</b>
        </div>
    );
};
export default TweetHeader;