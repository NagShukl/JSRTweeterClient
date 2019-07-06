import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import TwitterSelect from './TwitterSelect'

const TwitterAppHeader = (props) => {
    const performTweetTypeSelect = (evt) => {
        props.onTweetTypeSelect(evt.target.value);
    }
    return (
        <div className="TwitterAppHeader">
            <TwitterSelect
                selectedTweetType={props.selectedTweetType}
                onTweetTypeSelect={performTweetTypeSelect}
            />
            <Button color="primary" onClick={() => props.postClickAction()}>Post Tweet</Button>
        </div>
    );
};
export default TwitterAppHeader;