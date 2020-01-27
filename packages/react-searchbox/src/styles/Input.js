import { css } from '@emotion/core';
import styled from '@emotion/styled';

const input = css`
  width: 100%;
  height: 42px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    background-color: #fff;
  }
`;

const Input = styled.input`
  ${input}

  ${props =>
    props.showIcon &&
    props.iconPosition === 'left' &&
    css`
      padding-left: 32px;
    `};

  ${props =>
    props.showIcon &&
    props.iconPosition === 'right' &&
    css`
      padding-right: 32px;
    `};

  ${props =>
    // for clear icon
    props.showClear &&
    css`
      padding-right: 32px;
    `};

  ${props =>
    // for clear icon with search icon
    props.showClear &&
    props.showIcon &&
    props.iconPosition === 'right' &&
    css`
      padding-right: 48px;
    `};
`;

export default Input;
