import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from '../actions/progress';
import { clearError } from '../actions/error';


const api =  ({ dispatch, getState }) => next => async action => {

  if (action.type !== "API") {
    return next(action);
  }

      const { method, url, searchQuery, success, successJson, failure, err} = action.json;
      // clear the error box if it's displayed
      dispatch(clearError());
  
      // turn on spinner
      dispatch(incrementProgress());

  
      // call POST or GET

      if (method==="POST")
      await fetch(
        url,
        {
          method,
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
        } else {
          return null;          
        }
      })
      .then((json) => {
        console.log('successJson');
        console.log(successJson);
        if ( eval(successJson) ) {
          return dispatch(success(json));
        }
        return dispatch(failure(new Error(err)));
      })
      .catch(error => dispatch(failure(new Error(error))));
      else if (method==="GET")
      await fetch(
        url,
        {
          method,
          credentials: 'same-origin',
        },
      )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('failJson');
          return null;          
        }
      })
      .then((json) => {
        console.log('successJson');
        console.log(successJson);
        if ( eval(successJson) ) {
          return dispatch(success(json));
        }
        return dispatch(failure(new Error(err)));
      })      
      .catch(error => dispatch(failure(new Error(error))));      

      // turn off spinner
      dispatch(decrementProgress());
    };

export default api;
