import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import styled from 'styled-components';

interface ToggleButtonProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const ToggleButton = forwardRef<HTMLInputElement>(
  (props: ToggleButtonProps, ref) => {
    return (
      <Wrapper>
        <input ref={ref} type="checkbox" {...props} />
        <span className="slider round"></span>
      </Wrapper>
    );
  }
);

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &::before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      border-radius: 50%;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }

  input:checked + .slider {
    background-color: black;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px black;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  /* Rounded sliders */
  .round {
    border-radius: 24px;
  }
`;

export default ToggleButton;
