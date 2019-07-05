import React from 'react';

import AppConstents from '../constents/AppConstents';
const TwitterSelect = props => {
    return (
      <select
        onChange={props.onTweetTypeSelect}
        value={props.selectedTweetType}
        // className={props.side}
      >
        {
          AppConstents.tweet_types.map(type => (
          <option key={type.type_key} value={type.type_key}>
          {type.type_display}
          </option>
          
        ))
        }
      </select>
    );
  };
  export default TwitterSelect;