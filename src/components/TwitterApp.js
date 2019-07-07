import React, { useState, useEffect } from 'react';

import TwitterAppHeader from './TwitterAppHeader'
import TwitterAppBody from './TwitterAppBody'
import { useDispatch, useSelector } from 'react-redux';
import { switchTweetTypeAction, toggleShowPostAction } from '../redux/actions';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import { getGraphQLQuery } from "../constents/gqlQueries";
import AppConstents from '../constents/AppConstents';

const client = new ApolloClient({
  uri: AppConstents.GRAPH_QL_BASE
});

const TwitterApp = () => {
  // to get state form store
  const selectedTweetType = useSelector(state => state.selectedTweetType);
  const [executeSearch, doExecuteSearch] = useState({ isSearch: false, searchKey: '' });
  const showPostTweet = useSelector(state => state.showPostTweet);
  // let showPostTweet = false;

  // use to dispatch action
  const dispatch = useDispatch();
  const setSelectedTweetType = (selectedTweetType) => dispatch(switchTweetTypeAction(selectedTweetType));
  const toggleShowPostTweet = () => dispatch(toggleShowPostAction());

  useEffect(() => {
    // make an API call to load twittes
    console.log('**JAI Shri Ram!! useEffect making call to get data');
    //getTweetsForSelectedType();  
  }, [selectedTweetType, executeSearch]);


  const performTweetTypeSelect = (selectedType) => {
    doExecuteSearch({ isSearch: false, searchKey: '' });
    setSelectedTweetType(selectedType);

  }
  const performPostClickAction = (evt) => {
    toggleShowPostTweet();
  }
 
  /**
   * This function is to exceupte API call for search tweet.
   * @param {Search Query text} key 
   */
  const performSearchAction = (key) => {
    doExecuteSearch({ isSearch: true, searchKey: key });

  }


  return (
    <ApolloProvider client={client}>
      {console.log('**JSR,....Query is being called ' + selectedTweetType + ' : doExecuteSearch(true)==' + executeSearch)}
      <Query
        query={getGraphQLQuery(selectedTweetType, executeSearch)}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          let tweets = executeSearch.isSearch ? data.searchTweets : data.tweets;
          return (<div className="TwitterApp">
            <TwitterAppHeader selectedTweetType={selectedTweetType}
              onTweetTypeSelect={performTweetTypeSelect} postClickAction={performPostClickAction}
              onSearch={performSearchAction}></TwitterAppHeader>
            <TwitterAppBody tweets={tweets} showPostTweet={showPostTweet}></TwitterAppBody>


          </div>);

        }}

      </Query>
    </ApolloProvider>
  );
};


export default TwitterApp;
