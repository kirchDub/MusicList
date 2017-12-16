import { decrementProgress, incrementProgress } from './progress';

//Action Creators
export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });


//Check user session
export function  checkSession() {
    return async (dispatch) => {
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/checksession',
      // what to send
      {
        method: 'GET',
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
      if (json.username) {
        return dispatch(sessionCheckSuccess(json));
      } else {
        return dispatch(sessionCheckFailure());
      }
    })
    .catch(error => dispatch(sessionCheckFailure(error)));
  };
}


export function  logUserOut() {
    return async (dispatch) => {
        // turn on spinner
        dispatch(incrementProgress());

        // contact the API
        await fetch(
        // where to contact
        '/api/authentication/logout',
        // what to send
        {
            method: 'GET',
            credentials: 'same-origin',
        },
        )
        .then((response) => {
            if (response.status === 200) {
                dispatch(logoutSuccess());
            }
            dispatch(logoutFailure(`Error: ${response.status}`));
        })
        .catch((error) => {
            dispatch(logoutFailure(error));
        });

        // turn off spinner
        dispatch(decrementProgress());
    };
} 