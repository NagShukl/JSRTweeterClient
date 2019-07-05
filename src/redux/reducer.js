import {LOAD_TWEETS, SWITCH_TWEET_TYPE} from './actions'
import initState from './redux';

// const initState = {
//     items: [],
//     addedItems: [],
//     total: 0
//   };

  const AppReducer = (state = initState, action) => {
    switch (action.type) {
      case LOAD_TWEETS:
          return loadTweets(action.tweets, state);
      case SWITCH_TWEET_TYPE:
        return switchTweetType(action.tweetType, state);
    //   case REMOVE_FROM_CART:
    //     return performRemoveFromCart(action.id, state);
    //   case REDUCE_QUANTITY:
    //     return performReduceQuantity(action.id, state);
      default:
        return state;
    }
  }
const loadTweets = (tweets, state) => {
    console.log('**JSR,...Redux,...loadTweets called');
    return {
        ...state,
        tweets
      }
}
const switchTweetType = (tweetType, state) => {
    console.log('**JSR,...Redux,...switchTweetType called');
    return {
        ...state,
        selectedTweetType: tweetType
      }
}
  export default AppReducer;