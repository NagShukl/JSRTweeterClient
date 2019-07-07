import React from 'react';
const TweetHeader = (user) => {
    return (
        <div className="TweetHeader">
     <img src={user.profile_image_url} alt="user profile"/>
     <b>{user.name}: {user.screen_name}: {user.location}</b>
        </div>
        );
};
export default TweetHeader;