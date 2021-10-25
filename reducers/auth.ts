import axios from 'axios';

export interface AuthState {
  uid: number | null;
}

export enum ActionType {
  SET_UID = 'SET_UID',
}

interface SetUidPayload {
  uid: number;
}

type Payload = SetUidPayload | any;

export interface AuthAction<T = Payload> {
  type: ActionType;
  payload?: T;
}

export const setUid = (uid: number): AuthAction<SetUidPayload> => ({
  type: ActionType.SET_UID,
  payload: { uid },
});

const initialState: AuthState = {
  uid: null,
};

const setAuthorizationByUid = (uid: number | null) => {
  if (!uid) {
    delete axios.defaults.headers.common['Authorization'];
  } else {
    axios.defaults.headers.common['Authorization'] = `Basic ${Buffer.from(
      `${uid}:marrakech`
    )}`;
  }
};

const authReducer = (state = initialState, action: AuthAction) => {
  setAuthorizationByUid(state.uid);
  switch (action.type) {
    case ActionType.SET_UID:
      const { uid } = action.payload as SetUidPayload;

      return {
        ...state,
        uid,
      };
    default:
      return state;
  }
};

export default authReducer;
