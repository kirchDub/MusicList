import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from '../actions/progress';
import { clearError } from '../actions/error';


const api = ({ dispatch, getState }) => next => action => {

  if (action.type !== "API") {
    return next(action);
  }

      const { url, searchQuery, success, failure} = action.json;
      // clear the error box if it's displayed
      dispatch(clearError());
  
      // turn on spinner
      dispatch(incrementProgress());
  
      // Send packet to our API, which will communicate with Discogs
      fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify(searchQuery),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        },
      )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json.results) {    
          return dispatch(success(json));
        }
        return dispatch(failure(new Error(json.error)));
      })
      .catch(error => dispatch(failure(new Error(error))));
  
      // turn off spinner
      dispatch(decrementProgress());
    };

export default api;
