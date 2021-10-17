import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const PlayList: NextPage = () => {
  const socketRef = useRef<{ socket: Socket | null }>({ socket: null });
  const router = useRouter();
  const { page } = router.query;

  const [id, setId] = useState<string>('');

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      if (!socketRef.current.socket) {
        socketRef.current.socket = io(`ws://${window.location.host}`);
      }

      console.log(`market/list/${page}`);

      socketRef.current.socket.on(`market/list/${page}`, (msg) => {
        console.log(msg);
      });
    }
  }, [page]);

  return <div>{`Socket ID : ${id}`}</div>;
};

export default PlayList;
