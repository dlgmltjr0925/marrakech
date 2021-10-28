import EnrollMarket, {
  EnrollMarketRef,
} from '../../components/market/EnrollMarket';
import { GetServerSideProps, NextPage } from 'next';
import { Socket, io } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const enrollMarketRef = useRef<EnrollMarketRef>(null);
  const router = useRouter();

  const [id, setId] = useState<string>('');
  const [marketList, setMarketList] = useState<MarketListObject[]>(
    props.marketList
  );

  const handleClickEnroll = useCallback(() => {
    enrollMarketRef.current?.open();
  }, []);

  const handleClickEnter = useCallback(() => {
    const accessibleMarketList = marketList.filter(
      ({ canSpectate, hasPassword, rule, dealerIds }) => {
        const maxCount = rule === 0 ? 4 : rule;
        return !hasPassword && (canSpectate || dealerIds.length !== maxCount);
      }
    );
    if (accessibleMarketList.length === 0) return;

    const market =
      accessibleMarketList[
        (Math.random() * accessibleMarketList.length) >> 0
      ] || accessibleMarketList[0];

    router.push(`/market/${market.id}`);
  }, [marketList]);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      socketRef.current.socket = io(`ws://${window.location.host}/market/list`);

      socketRef.current.socket.on('connect', () => {
        setId(socketRef.current.socket?.id || '');

        socketRef.current.socket?.on(
          'marketList',
          (marketList: MarketListObject[]) => {
            console.log(marketList);

            setMarketList(marketList);
          }
        );

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
  }, []);

  return (
    <Wrapper>
      <div className="content-wrapper">
        <ControllBox
          onClickEnroll={handleClickEnroll}
          onClickEnter={handleClickEnter}
        />
        <List marketList={marketList} />
      </div>
      <EnrollMarket ref={enrollMarketRef} />
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

  return {
    props: {
      marketList: marketService.getMarketList(),
    },
  };
};

export default MarketList;
