import type { NextPage } from 'next';
import styled from 'styled-components';
import Header from '../components/home/Header';
import Guide from '../components/home/Guide';

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className='content-wrapper'>
        <Guide />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content-wrapper {
    max-width: 100%;
    width: var(--content-max-width);
    margin: 0 auto;
  }
`;

export default Home;
