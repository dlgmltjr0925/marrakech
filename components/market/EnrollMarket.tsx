import { MarketListObject, Rule } from '../../api/market/market.dto';
import {
  MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import ToggleButton from '../common/ToggleButton';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/dist/client/router';

export interface EnrollMarketRef {
  open: () => void;
}

interface EnrollMarketProps {}

interface FormData {
  title: string;
  hasPassword: boolean;
  password?: string;
  rule: '0' | '2' | '3' | '4';
  canSpectate: 'true' | 'false';
}

interface NewMarket {
  title: string;
  password?: string;
  rule: Rule;
  canSpectate: boolean;
}

const MARKET_TITLE = [
  '서울 광장시장',
  '타이베이 남문시장',
  '방콕 짜뚜짝 시장',
  '이스탄불 그랜드 바자르',
  '런던 코벤트 가든',
  '뉴욕 첼시 마켓',
  '중국 베이징 왕푸징 시장',
  '태국 방콕 매끌렁 시장',
  '모로코 페스 가죽시장',
];

const EnrollMarket = forwardRef<EnrollMarketRef, EnrollMarketProps>(
  (_, ref) => {
    const router = useRouter();

    const { register, handleSubmit, watch, setValue, setFocus } = useForm();

    const { error, isLoading, data, mutate } = useMutation(
      (newMarket: NewMarket) => {
        return axios.post<{ market: MarketListObject }>(
          '/api/market',
          newMarket
        );
      }
    );

    const [visible, setVisible] = useState<boolean>(false);

    const handleClickDimmed = useCallback((e: MouseEvent<HTMLDivElement>) => {
      setVisible(false);
    }, []);

    const handleClickCancelButton = handleClickDimmed;

    const handleClickEnrollWrapper = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      },
      []
    );

    const submit = useCallback(
      ({ title, hasPassword, password, rule, canSpectate }: FormData) => {
        if (isLoading) return;
        mutate({
          title,
          password: hasPassword && password ? password : undefined,
          rule: parseInt(rule) as Rule,
          canSpectate: canSpectate === 'true',
        });
      },
      [isLoading]
    );

    useEffect(() => {
      if (data) {
        if (data.status === 201) {
          const { market } = data.data;
          router.push(`/market/${market.id}`);
        }
      } else if (error) {
        alert('오류가 발생하였습니다.');
      }
    }, [error, data]);

    useEffect(() => {
      setFocus('password');
    }, [watch('hasPassword')]);

    useEffect(() => {
      if (visible) {
        const marketTitle =
          MARKET_TITLE[(Math.random() * MARKET_TITLE.length) >> 0] ||
          MARKET_TITLE[0];
        setValue('title', marketTitle);

        setValue('rule', '0');
        setValue('canSpectate', 'false');
      }
    }, [visible]);

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
    }));

    return (
      <Wrapper visible={visible} onClick={handleClickDimmed}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="enroll-wrapper" onClick={handleClickEnrollWrapper}>
            {/* title */}
            <div className="input-wrapper">
              <span className="label">마켓이름</span>
              <div className="value-wrapper">
                <input
                  className="title"
                  type="text"
                  defaultValue=""
                  {...register('title')}
                />
              </div>
            </div>
            {/* password */}
            <div className="input-wrapper">
              <span className="label">비밀번호</span>
              <div className="value-wrapper">
                <ToggleButton {...register('hasPassword')} />
                <input
                  className="password"
                  type="password"
                  defaultValue=""
                  {...register('password')}
                  disabled={!watch('hasPassword')}
                />
              </div>
            </div>
            {/* rule */}
            <div className="input-wrapper">
              <span className="label">규칙</span>
              <div className="value-wrapper">
                <input
                  type="radio"
                  id="rule-0"
                  value="0"
                  {...register('rule')}
                />
                <label htmlFor="rule-0">자유</label>
                <input
                  type="radio"
                  id="rule-2"
                  value="2"
                  {...register('rule')}
                />
                <label htmlFor="rule-2">2인</label>
                <input
                  type="radio"
                  id="rule-3"
                  value="3"
                  {...register('rule')}
                />
                <label htmlFor="rule-3">3인</label>
                <input
                  type="radio"
                  id="rule-4"
                  value="4"
                  {...register('rule')}
                />
                <label htmlFor="rule-4">4인</label>
              </div>
            </div>
            {/* canSpectate */}
            <div className="input-wrapper">
              <span className="label">관전가능</span>
              <div className="value-wrapper">
                <input
                  type="radio"
                  id="canSpectate-false"
                  value="false"
                  {...register('canSpectate')}
                />
                <label htmlFor="canSpectate-false">No</label>
                <input
                  type="radio"
                  id="canSpectate-true"
                  value="true"
                  {...register('canSpectate')}
                />
                <label htmlFor="canSpectate-true">Yes</label>
              </div>
            </div>
            {/* button */}
            <div className="button-wrapper">
              <input
                className="cancel-button"
                type="button"
                value="취 소"
                onClick={handleClickCancelButton}
              />
              <input className="submit-button" type="submit" value="등 록" />
            </div>
          </div>
        </form>
      </Wrapper>
    );
  }
);

interface WrapperProps {
  visible: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  justify-content: center;
  align-items: center;

  .enroll-wrapper {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    justify-content: center;
    padding: 50px 50px 50px 0;

    .input-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row;

      .label {
        flex: 1;
        color: black;
        text-align: right;
        margin: 0 10px;
        font-size: 1.1rem;
      }

      .value-wrapper {
        flex: 3;
        display: flex;
        flex-direction: row;
        align-items: center;

        input[type='text'],
        input[type='password'] {
          flex: 1;
          padding: 5px 10px;
          font-size: 1.1rem;
        }

        .password {
          margin-left: 10px;
        }
      }
    }

    .label-wrapper {
      flex: 1;
      border: 1px solid blue;
    }

    .button-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 20px 0 0 50px;

      input {
        width: 90px;
        height: 40px;
        margin: 0 20px;
        font-size: 1rem;
        line-height: 1rem;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-weight: 500;
        background-color: transparent;
        cursor: pointer;
        transition: 0.4s;
      }

      .cancel-button {
        color: red;

        &:hover {
          background-color: rgba(255, 0, 0, 0.2);
        }

        &:active {
          background-color: rgba(255, 0, 0, 0.3);
        }
      }

      .submit-button {
        &:hover {
          background-color: rgba(0, 0, 255, 0.1);
        }

        &:active {
          background-color: rgba(0, 0, 255, 0.2);
        }
      }
    }
  }

  input[type='radio'] {
    display: none;
    & + label {
      width: 70px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 8px;
      text-align: center;
      margin: 5px;
      font-weight: 500;
      cursor: pointer;
    }

    &:checked + label {
      background-color: rgba(0, 0, 255, 0.1);
    }
  }
`;

export default EnrollMarket;
