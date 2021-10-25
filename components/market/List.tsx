import MarketItem from './MarketItem';
import styled from 'styled-components';

const List = () => {
  return (
    <Wrapper>
      <ul className="list-wrapper">
        {Array.from({ length: 101 }, (_, i) => i).map((value) => (
          <MarketItem
            key={value}
            item={{
              id: value,
              title: '한게임 어때요?',
              hasPassword: value % 3 === 0,
              status: 'WAIT',
              canSpectate: (value + 1) % 4 === 0,
              rule: 0,
              dealerIds: [1],
              spectatorIds: [],
            }}
          />
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-y: scroll;
  margin: 20px 0 40px;
  background-color: rgba(30, 30, 30, 0.4);
  border-radius: 10px;
  padding: 30px;

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
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export default List;
