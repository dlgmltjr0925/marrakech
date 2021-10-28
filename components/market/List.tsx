import MarketItem from './MarketItem';
import { MarketListObject } from '../../api/market/market.dto';
import styled from 'styled-components';

interface ListProps {
  marketList: MarketListObject[];
}

const List = ({ marketList }: ListProps) => {
  return (
    <Wrapper>
      <ul className="list-wrapper">
        {marketList.map((marketListObject) => (
          <MarketItem key={marketListObject.id} item={marketListObject} />
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  overflow-y: scroll;
  margin: 20px 0 40px;
  background-color: rgba(30, 30, 30, 0.4);
  border-radius: 10px;
  padding: 30px 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    height: 10%;
    background: #555;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  .list-wrapper {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export default List;
