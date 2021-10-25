import { GetServerSideProps, NextPage } from 'next';
import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import ControllBox from '../../components/market/ControllBox';
import List from '../../components/market/List';
import { MarketListObject } from '../../api/market/market.dto';
import MarketService from '../../api/market/market.service';
import styled from 'styled-components';
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
    return () => {
      if (socketRef.current.socket) {
        socketRef.current.socket.close();
        socketRef.current.socket = null;
      }
    };
  }, [page]);

  return (
    <Wrapper>
      <div className="content-wrapper">
        <ControllBox
          onClickEnroll={() => {
            alert('clicked enroll');
          }}
          onClickEntry={() => {
            alert('clicked entry');
          }}
        />
        <List />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-image: url('/market_list_bg.jpeg');
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
  }

  .content-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;
    width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 20px;
  }
`;

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
