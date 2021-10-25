import Guide from '../components/home/Guide';
import Header from '../components/home/Header';
import type { NextPage } from 'next';
import Player from '../components/home/Player';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header />
      <Player />
      <div className="content-wrapper">
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
