import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import { NextPage } from 'next';
import { ReduxState } from '../../reducers';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';

const Game: NextPage = () => {
  const socketRef = useRef<{ socket: Socket | null }>({ socket: null });
  const { token } = useSelector(({ auth }: ReduxState) => ({
    token: auth.token,
  }));

  const router = useRouter();

  const { mid } = router.query; // mid is market id

  const [id, setId] = useState<string>('');

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient && mid) {
      const auth = { token };
      socketRef.current.socket = io(
        `ws://${window.location.host}/market/${mid}`,
        { auth }
      );

      socketRef.current.socket.on('connect', () => {
        setId(socketRef.current.socket?.id || '');

        // socketRef.current.socket?.on(
        //   'marketList',
        //   (marketList: MarketListObject[]) => {
        //     console.log(marketList);

        //     setMarketList(marketList);
        //   }
        // );

        socketRef.current.socket?.on('disconnect', () => {
          setId('');
        });
      });
    }
    return () => {
      if (socketRef.current.socket) {
        socketRef.current.socket.close();
        socketRef.current.socket = null;
      }
    };
  }, [mid, token]);

  return (
    <div>
      <p>{`Game : ${mid}`}</p>
      <p>{`Client Id : ${id}`}</p>
    </div>
  );
};

export default Game;
