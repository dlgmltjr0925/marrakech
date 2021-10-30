import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import { MarketListObject } from '../../api/market/market.dto';
import { MarketMessage } from '../../libs/market_namespace';
import { NextPage } from 'next';
import { ReduxState } from '../../reducers';
import { access } from 'fs';
import styled from 'styled-components';
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
  const [market, setMarket] = useState<MarketListObject | null>(null);

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

        socketRef.current.socket?.on(
          'market',
          (marketMessage: MarketMessage) => {
            console.log(marketMessage);
            if (
              marketMessage.status === 'REJECT' ||
              marketMessage.status === 'BAN'
            ) {
              if (socketRef.current.socket?.id === marketMessage.socketId) {
                router.back();
              }
            }

            if (marketMessage.market) {
              setMarket(marketMessage.market);
            }
          }
        );

        socketRef.current.socket?.on('disconnect', () => {});
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
    <Wrapper>
      <p>
        {window.innerWidth}, {window.innerHeight}
      </p>
      <p>{`Game : ${mid}`}</p>
      <p>{`Client Id : ${id}`}</p>
      {market && (
        <div>
          <p>{market.id}</p>
          <p>{market.title}</p>
          <p>{market.status}</p>
          <p>{market.dealerIds.join(',')}</p>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: white;
`;

export default Game;
