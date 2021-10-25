import { useCallback, useMemo, useState } from 'react';

import { NextPage } from 'next';
import { ReduxState } from '../../reducers';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

interface PlayerProps {}

interface WrapperProps {
  isOpened: boolean;
}

const Player: NextPage<PlayerProps> = () => {
  const player = useSelector(({ player }: ReduxState) => player);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const playerName = useMemo(() => {
    return player.name?.charAt(0).toUpperCase();
  }, [player.name]);

  const toggleOpen = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  if (!player.id) return null;

  return (
    <Wrapper isOpened={isOpened}>
      {isOpened && (
        <div className='profile-info-wrapper'>
          <p className='profile-info-category'>
            ID
            <span className='profile-info-value'>
              {player.id.toString().padStart(10, '0')}
            </span>
          </p>
          <p className='profile-info-category'>
            Name <span className='profile-info-value'>{player.name}</span>
          </p>
          <div className='record-wrapper'>
            <p className='empty-label'>No Record</p>
          </div>
        </div>
      )}

      <div className='profile-wrapper'>
        <button className='profile-circle' type='button' onClick={toggleOpen}>
          {playerName}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 20px;
  min-width: 90px;
  min-height: 90px;

  .profile-info-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 20px;
    border-radius: 10px;
    border: 0 solid #444;
    box-sizing: border-box;
    background-color: ${({ isOpened }) =>
      isOpened ? '#242528' : 'transparent'};
    border-width: ${({ isOpened }) => (isOpened ? '1px' : '0')};
    width: 300px;

    .profile-info-category {
      margin-bottom: 15px;
      color: #aaa;
    }

    .profile-info-value {
      color: #ddd;
      margin-left: 20px;
    }

    .record-wrapper {
      border-top: 1px solid #666;
      padding-top: 20px;
      height: 200px;
      overflow-y: auto;

      .empty-label {
        color: #aaa;
        text-align: center;
      }
    }
  }

  .profile-wrapper {
    position: absolute;
    display: flex;
    top: 18px;
    right: 18px;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: rgba(200, 200, 200, 0);
    transition: background-color 0.5s;

    &:hover {
      background-color: rgba(200, 200, 200, 0.2);
    }

    .profile-circle {
      display: flex;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: #354b56;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 1.6rem;
      color: #ddd;
      outline: none;
      border: 0;
    }
  }
`;

export default Player;
