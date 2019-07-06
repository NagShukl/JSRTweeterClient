import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import TwitterSelect from './TwitterSelect'

const TwitterAppHeader = (props) => {
    const performTweetTypeSelect = (evt) => {
        props.onTweetTypeSelect(evt.target.value);
    }
  
    /**
     * This function is to delegate Search action to parent component
     * @param {form submit event} evt 
     */
    const performSearch = (evt) => {
        evt.preventDefault();
        if(evt.target.searchInput.value.trim() !== '') {
            props.onSearch(evt.target.searchInput.value.trim());
        }
        
    }
    return (
        <div className="TwitterAppHeader">
           
            <div className="rightPanel">
            <form onSubmit={performSearch}>
                <input name="searchInput" type="search" className='form-control' q="googlesearch"
                placeholder='Search key...'></input>
            </form>
                <Button color="primary" onClick={() => props.postClickAction()}>Post Tweet</Button>
            </div>
            <TwitterSelect
                selectedTweetType={props.selectedTweetType}
                onTweetTypeSelect={performTweetTypeSelect}
            />
        </div>
    );
};
export default TwitterAppHeader;