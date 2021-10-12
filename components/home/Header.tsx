import styled from 'styled-components';
import Link from 'next/link';

const Header = () => {
  return (
    <Wrapper>
      <div className='cover-wrapper'>
        <img
          className='cover-image'
          src='/marrakech_cover.jpeg'
          alt='marrakech_cover'
        />
        <div className='cover-side-wrapper'>
          <div className='info-wrapper'>
            <h1>마라케시</h1>
            <p>인원 : 2 ~ 4</p>
            <p>연령 : 8세</p>
            <p>소요시간 : 20분</p>
          </div>
          <Link href='/play/list'>
            <a className='play-button'>게임하기</a>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: relative;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('/banner.jpeg');
  margin-bottom: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .cover-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    max-width: 100%;
    width: var(--content-max-width);
    margin: 0 auto;
    padding: 100px 0 0 0;

    .cover-image {
      width: 450px;
      height: 450px;
      box-sizing: border-box;
      border: 2px solid #ddd;
    }

    .cover-side-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      .info-wrapper {
        margin: 30px 0 0 50px;

        h1 {
          font-size: 2em;
          margin-bottom: 40px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        p {
          font-size: 1.2em;
          margin-bottom: 20px;
        }
      }

      .play-button {
        margin: 0 0 30px 50px;
        padding: 18px 48px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1.2em;
        transition: background-color 0.3s;
        letter-spacing: 2px;

        &:hover {
          background-color: rgba(200, 200, 200, 0.2);
        }

        &:active {
          background-color: rgba(200, 200, 200, 0.5);
        }
      }
    }
  }
`;

export default Header;
