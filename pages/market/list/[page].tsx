import { GetServerSideProps, NextPage } from 'next';
import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import { MarketListObject } from '../../../api/market/market.dto';
import MarketService from '../../../api/market/market.service';
import { useRouter } from 'next/dist/client/router';

interface MarketListProps {
  marketList: MarketListObject[];
}

const MarketList: NextPage<MarketListProps> = (props) => {
  const socketRef = useRef<{ socket: Socket | null }>({ socket: null });
  const router = useRouter();
  const { page } = router.query;

  const [id, setId] = useState<string>('');
  const [marketList, setMarketList] = useState<MarketListObject[]>(
    props.marketList
  );

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient && page) {
      if (socketRef.current.socket) socketRef.current.socket = null;
      socketRef.current.socket = io(
        `ws://${window.location.host}/market/list/${page}`
      );

      socketRef.current.socket.once('connect', () => {
        setId(socketRef.current.socket?.id || '');

        socketRef.current.socket?.on(
          'marketList',
          (marketList: MarketListObject[]) => {
            setMarketList(marketList);
          }
        );

        socketRef.current.socket?.once('disconnect', () => {
          setId('');
        });
      });
    }
  }, [page]);

  return (
    <div>
      <ul>
        {marketList.map((market) => (
          <li key={market.id}>
            {`id: ${market.id} title: ${market.title} status: ${market.status}`}
          </li>
        ))}
      </ul>
      <div>{`client id : ${id}`}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const marketService = new MarketService();
  const { page } = context.query;

  const marketList =
    typeof page === 'string' ? marketService.getListByPage(parseInt(page)) : [];

  return {
    props: {
      marketList,
    },
  };
};

export default MarketList;
