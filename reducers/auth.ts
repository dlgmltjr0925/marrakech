import axios from 'axios';

export interface AuthState {
  uid: number | null;
  token: string | null;
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
  token: null,
};

const createTokenByUid = (uid: number | null) => {
  if (!uid) return null;
  return `Basic ${Buffer.from(`${uid}:marrakech`).toString('base64')}`;
};

const setAuthorizationByToken = (token: string | null) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
  } else {
    axios.defaults.headers.common['Authorization'] = token;
  }
};

const authReducer = (state = initialState, action: AuthAction) => {
  const token = createTokenByUid(state.uid);
  setAuthorizationByToken(token);
  switch (action.type) {
    case ActionType.SET_UID:
      const { uid } = action.payload as SetUidPayload;

      const token = createTokenByUid(uid);
      setAuthorizationByToken(token);

      return {
        ...state,
        uid,
        token,
      };
    default:
      return state;
  }
};

export default authReducer;
