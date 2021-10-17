import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import { NextPage } from 'next';

const PlayList: NextPage = () => {
  const ref = useRef<{ socket: Socket | null }>({ socket: null });
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      if (!ref.current.socket) {
        ref.current.socket = io(`ws://${window.location.host}`);
      }

      ref.current.socket.on('market/list/1', (msg) => {
        console.log(msg);
      });
    }
  }, []);

  return <div>{`Socket ID : ${id}`}</div>;
};

export default PlayList;
