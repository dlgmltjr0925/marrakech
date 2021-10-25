import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReduxState } from '../reducers';
import axios from 'axios';
import { setPlayer } from '../reducers/player';
import { setUid } from '../reducers/auth';

const usePlayer = () => {
  const { auth, player } = useSelector(({ auth, player }: ReduxState) => ({
    auth,
    player,
  }));
  const dispatch = useDispatch();

  const createPlayer = useCallback(async () => {
    try {
      const res = await axios.post<{ player: { id: number; name: string } }>(
        `${window.location.origin}/api/player`
      );
      if (res.status === 201) {
        const { player } = res.data;
        dispatch(setPlayer(player));
        dispatch(setUid(player.id));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!auth.uid && !player.id) {
      createPlayer();
    }
  }, [auth.uid, player.id]);

  return player;
};

export default usePlayer;
