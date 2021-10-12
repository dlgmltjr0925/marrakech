import styled from 'styled-components';

const Guide = () => {
  return (
    <Wrapper>
      <h2 className='title'>진행방법</h2>
      <ol>
        <li>아쌈 방향 정하기</li>
        <li>주사위 굴리고, 나온 숫자만큼 움직이기</li>
        <li>상대 카펫에 위치했을 때 돈 지불하기</li>
        <li>자신의 양탄자 한장 깔기</li>
      </ol>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .title {
    font-size: 1.7em;
    margin-bottom: 36px;
  }

  ol {
    list-style: decimal;
    padding: 0 0 0 30px;

    li {
      font-size: 1.2em;
      margin-bottom: 24px;
    }
  }
`;

export default Guide;
