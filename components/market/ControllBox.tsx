import styled from 'styled-components';

const ControllBox = () => {
  return (
    <Wrapper>
      <div className="input-wrapper">
        <h1>Marrakech</h1>
        <input className="input-search" type="text" />
      </div>
      <div className="button-wrapper">
        <div className="button-area">
          <button className="button-enroll" type="button" />
        </div>
        <div className="button-area">
          <button className="button-entry" type="button" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  background-image: url('https://t1.daumcdn.net/cfile/tistory/24C4623359758CF723');
  background-size: cover;
  margin: 30px 0 0;
  border-radius: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    border-radius: 10px;
  }

  .input-wrapper {
    flex: 1;
    z-index: 1;

    h1 {
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 1.6rem;
      letter-spacing: 1px;
      color: #aaa;
    }

    .input-search {
      width: 500px;
      max-width: 100%;
      padding: 6px 20px;
      font-size: 1.2rem;
      border: none;
      outline: none;
      border-radius: 50px;
      background-color: #373737;
      color: #fff;

      &:focus {
        border: none;
        outline: none;
        background-color: #1d1e21;
      }
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 1;

    .button-area {
      width: 150px;
      height: 70px;
    }

    button {
      margin-left: 20px;
      border: none;
      outline: none;
      width: 120px;
      height: 60px;
      box-shadow: 2px 3px 10px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 5px;

      &:hover {
        box-shadow: 2px 3px 20px;
        width: 122px;
        height: 62px;
      }

      &:active {
        width: 120px;
        height: 60px;
      }
    }

    .button-enroll {
      background-image: url('/button_market_enroll.jpeg');
    }

    .button-entry {
      background-image: url('/button_market_entry.jpeg');
    }
  }
`;

export default ControllBox;
