import styled from 'styled-components';

const List = () => {
  return <Wrapper>List</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 20px 0 40px;
  background-color: rgba(30, 30, 30, 0.9);
  overflow-y: auto;
`;

export default List;
