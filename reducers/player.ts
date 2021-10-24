interface Player {
  id: number;
  name: string;
}

export interface PlayerState {
  id: number | null;
  name: string | null;
}

export enum ActionType {
  SET_PLAYER = 'SET_PLAYER',
}

interface PlayerPayload {
  player: Player;
}

type Payload = PlayerPayload;

export interface PlayerAction<T = Payload> {
  type: ActionType;
  payload?: T;
}

export const setPlayer = (player: Player) => ({
  type: ActionType.SET_PLAYER,
  payload: { player },
});

const initialState: PlayerState = {
  id: null,
  name: null,
};

const playerReducer = (state = initialState, action: PlayerAction) => {
  switch (action.type) {
    case ActionType.SET_PLAYER:
      const { player } = action.payload as PlayerPayload;

      return {
        ...state,
        ...player,
      };
    default:
      return state;
  }
};

export default playerReducer;
