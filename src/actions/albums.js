import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
export const albumAddFailure = error => ({ type: 'MUSIC_ALBUM_ADD_FAILURE', error });
export const albumAddSuccess = json => ({ type: 'MUSIC_ALBUM_ADD_SUCCESS', json });
export const albumDeleteFailure = error => ({ type: 'MUSIC_ALBUM_DELETE_FAILURE', error });
export const albumDeleteSuccess = json => ({ type: 'MUSIC_ALBUM_DELETE_SUCCESS', json });
export const albumLatestFailure = error => ({ type: 'MUSIC_ALBUM_LATEST_FAILURE', error });
export const albumLatestSuccess = json => ({ type: 'MUSIC_ALBUM_LATEST_SUCCESS', json });
export const albumSearchClear = () => ({ type: 'MUSIC_ALBUM_SEARCH_CLEAR' });
export const albumSearchFailure = error => ({ type: 'MUSIC_ALBUM_SEARCH_FAILURE', error });
export const albumSearchSuccess = json => ({ type: 'MUSIC_ALBUM_SEARCH_SUCCESS', json });
export const albumsPopulateFailure = error => ({ type: 'MUSIC_ALBUMS_POPULATE_FAILURE', error });
export const albumsPopulateSuccess = json => ({ type: 'MUSIC_ALBUMS_POPULATE_SUCCESS', json });

// Add an Album
export const addAlbum = (id) => ({
  type: 'API',
  json: {
    url: '/api/albums/add',
    searchQuery: {id},
    success: albumAddSuccess,
    failure: albumAddFailure,
    successJson: 'json.email',
    err: '',
  }
});

// Delete an album from user's list
export const deleteAlbum = (albumId) => ({
  type: 'API',
  json: {
    url: '/api/albums/delete',
    searchQuery: {albumId},
    success: albumDeleteSuccess,
    failure: albumDeleteFailure,
    successJson: 'json.email',
    err: '',
  }
});

// Get the latest album from the Discogs API
export const getLatestAlbum = () => ({
  type: 'API',
  json: {
    url: '/api/albums/search',
    searchQuery: {q: '', type: 'master', format: 'album', sort_order: 'asc'},
    success: albumLatestSuccess,
    failure: albumLatestFailure,
    successJson: 'json.results',
    err: '',
  }
});

// Populate Album data
export const populateAlbums = (albums) => ({
  type: 'API',
  json: {
    url: '/api/albums/populate',
    searchQuery: {albums},
    success: albumsPopulateSuccess,
    failure: albumsPopulateFailure,
    successJson: 'json.error',
    err: '',
  }
});

//search album
export const searchAlbums = (searchText) => ({
  type: 'API',
  json: {
    url: '/api/albums/search',
    searchQuery: {q: searchText, type: 'master', format: 'album'},
    success: albumSearchSuccess,
    failure: albumSearchFailure,
    successJson: 'json.results',
    err: '',
  }
});












export function addAlbum2(id) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/albums/add',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify({ id }),
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
      if (json.email) {
        return dispatch(albumAddSuccess(json));
      }
      return dispatch(albumAddFailure(new Error(json)));
    })
    .catch(error => dispatch(albumAddFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}


// Delete an album from user's list
export function deleteAlbum2(albumId) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Hit the API
    await fetch(
      '/api/albums/delete',
      {
        method: 'POST',
        body: JSON.stringify({ albumId }),
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
      if (!json.error) {
        dispatch(populateAlbums(json.albums)); // eslint-disable-line
      }
      return json;
    })
    .then((json) => {
      if (!json.error) {
        return dispatch(albumDeleteSuccess(json));
      }
      return dispatch(albumDeleteFailure(new Error(json.error)));
    })
    .catch(error => dispatch(albumDeleteFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}


 // Get the latest album from the Discogs API
 export function getLatestAlbum2() {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // Build packet to send to Discogs API
    const searchQuery = {
      q: '',
      type: 'master',
      format: 'album',
      sort_order: 'asc',
    };

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/albums/search',
      // what to send
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
        return dispatch(albumLatestSuccess(json.results[0]));
      }
      return dispatch(albumLatestFailure(new Error(json.error)));
    })
    .catch(error => dispatch(albumLatestFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}
   

// Populate Album data
export function populateAlbums2(albums) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Hit the API
    await fetch(
      '/api/albums/populate',
      {
        method: 'POST',
        body: JSON.stringify(albums),
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
      if (!json.error) {
        return dispatch(albumsPopulateSuccess(json));
      }
      return dispatch(albumsPopulateFailure(new Error(json.error)));
    })
    .catch(error => dispatch(albumsPopulateFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Search Albums
export function searchAlbums2(searchText) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Build packet to send to Discogs API
    const searchQuery = {
      q: searchText,
      type: 'master',
      format: 'album',
    };

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/albums/search',
      // what to send
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
        return dispatch(albumSearchSuccess(json));
      }
      return dispatch(albumSearchFailure(new Error(json.error)));
    })
    .catch(error => dispatch(albumSearchFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}