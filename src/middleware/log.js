const log = ({ getState, dispatch }) => next => action => {

  console.log('ACTION CUSTOM: ' + action.type, action);

  next(action);
};

export default log;