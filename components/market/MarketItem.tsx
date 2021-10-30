import { faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MarketListObject } from '../../api/market/market.dto';
import styled from 'styled-components';

interface Item extends MarketListObject {}

interface MarketItemProps {
  item: Item;
  onClickMarketItem: (marketItem: MarketListObject) => void;
}

const MarketItem = ({ item, onClickMarketItem }: MarketItemProps) => {
  const { title, hasPassword, rule, dealerIds } = item;
  const count = useMemo(() => {
    return `${dealerIds.length} / ${rule === 0 ? 4 : rule}`;
  }, [rule, dealerIds.length]);

  const handleClickMarketItem = useCallback(() => {
    onClickMarketItem(item);
  }, [item]);

  return (
    <Wrapper className="market-item" onClick={handleClickMarketItem}>
      <div className="image-wrapper">
        <div className="image-sub-wrapper"></div>
        <div className="status-wrapper">
          <p>{item.status}</p>
        </div>
      </div>
      <div className="title-wrapper">
        {hasPassword && <FontAwesomeIcon className="icon-lock" icon={faLock} />}
        <span className="title">{title}</span>
        <FontAwesomeIcon className="icon-users" icon={faUsers} />
        <span className="user-count">{count}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  position: relative;
  width: 48%;
  box-sizing: border-box;
  border: 1px solid #444;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #fff;
  }

  .title-wrapper {
    display: flex;
    flex-direction: row;
    padding: 20px 10px;
    border-bottom: 1px solid #444;
    height: 50px;

    .icon-lock {
      font-size: 1.2rem;
    }

    .title {
      flex: 1;
      margin: 0 10px;
    }

    .icon-users {
      font-size: 1rem;
    }

    .user-count {
      margin-left: 10px;
    }
  }

  .image-wrapper {
    width: 100%;
    position: relative;

    .image-sub-wrapper {
      position: relative;
      padding-top: 50%;
      overflow: hidden;
      background-image: url('https://previews.123rf.com/images/jointstar/jointstar1407/jointstar140700003/29843341-%EC%B9%B4%ED%8E%AB-%ED%85%8D%EC%8A%A4%EC%B2%98.jpg');
      background-size: cover;
      background-position: center;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }

    .status-wrapper {
      position: absolute;
      top: 10px;
      left: 20px;
      padding: 10px;
      background: linear-gradient(
        0deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(10, 121, 9, 0.5) 15%,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0) 100%
      );

      p {
        color: #ccc;
      }
    }
  }
`;

export default MarketItem;
