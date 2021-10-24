import auth from './auth';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth,
});

const persistConfig = {
  key: '_persist',
  storage,
};

export default persistReducer(persistConfig, rootReducer);
