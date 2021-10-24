import auth, { AuthState } from './auth';
import player, { PlayerState } from './player';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface ReduxState {
  auth: AuthState;
  player: PlayerState;
}

const rootReducer = combineReducers({
  auth,
  player,
});

const persistConfig = {
  key: '__redux_persist',
  storage,
};

export default persistReducer(persistConfig, rootReducer);
