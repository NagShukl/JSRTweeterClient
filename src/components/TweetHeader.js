import React from 'react';
const TweetHeader = (user) => {
    return (
        <div className="TweetHeader">
            <img src={user.profile_image_url} alt="userImage" />
            <strong>{user.name} ({user.screen_name})</strong> {user.location}
        </div>
    );
};
export default TweetHeader;