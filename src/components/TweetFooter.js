import React from 'react';
const TweetFooter = (user) => {
    return (
        <div>
       <p>AA {user.profile_image_url}</p>
     <img src={user.profile_image_url}/>
     <b>{user.name}: {user.screen_name}: {user.location}</b><br></br>
        </div>
        );
};
export default TweetFooter;