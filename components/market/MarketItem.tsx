import { faLock, faUsers } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MarketListObject } from '../../api/market/market.dto';
import styled from 'styled-components';
import { useMemo } from 'react';

interface Item extends MarketListObject {}

interface MarketItemProps {
  item: Item;
}

const MarketItem = ({
  item: { title, hasPassword, rule, spectatorIds },
}: MarketItemProps) => {
  const count = useMemo(() => {
    return `${spectatorIds.length} / ${rule === 0 ? 4 : rule}`;
  }, [rule, spectatorIds.length]);

  return (
    <Wrapper>
      <div className="image-wrapper">
        <div className="image-sub-wrapper"></div>
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
  }
`;

export default MarketItem;
