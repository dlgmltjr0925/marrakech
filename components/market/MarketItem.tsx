import { MarketListObject } from '../../api/market/market.dto';
import styled from 'styled-components';

interface Item extends MarketListObject {}

interface MarketItemProps {
  item: Item;
}

const MarketItem = ({ item }: MarketItemProps) => {
  return (
    <Wrapper>
      <div className="image-wrapper">
        <div className="image-sub-wrapper"></div>
      </div>
      <div className="title-wrapper">{item.title}</div>
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
    padding: 20px 10px;
    border-bottom: 1px solid #444;
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
