import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { middleware as reduxPackMiddleware } from 'redux-pack';
// import { storageMiddleware } from './config/localStorage';
import rootReducer from './reducers';

// const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, 
    reduxPackMiddleware, 
    // storageMiddleware
  )
);

export default store
