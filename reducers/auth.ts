export interface AuthState {
  uid: string | null;
}

export enum ActionType {
  SET_UID = 'SET_UID',
}

interface SetUidPayload {
  uid: string;
}

type Payload = SetUidPayload | any;

export interface AuthAction<T = Payload> {
  type: ActionType;
  payload?: T;
}

export const setUid = (uid: string): AuthAction<SetUidPayload> => ({
  type: ActionType.SET_UID,
  payload: {
    uid,
  },
});

const initialState: AuthState = {
  uid: null,
};

const authReducer = (state = initialState, action: AuthAction) => {
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
