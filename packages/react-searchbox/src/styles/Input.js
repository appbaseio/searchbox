import { css } from '@emotion/core';
import styled from '@emotion/styled';

const input = css`
  width: 100%;
  height: 42px;
  line-height: 42px;
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
      padding-left: 36px;
    `};

  ${props =>
    props.showIcon &&
    props.iconPosition === 'right' &&
    css`
      padding-right: 36px;
    `};

  ${props =>
    // for clear icon
    props.showClear &&
    css`
      padding-right: 36px;
    `};
  ${props =>
    // for voice search icon
    props.showVoiceSearch &&
    css`
      padding-right: 36px;
    `};
  ${props =>
    // for clear icon with search icon
    props.showClear &&
    props.showIcon &&
    props.iconPosition === 'right' &&
    css`
      padding-right: 66px;
    `};
  ${props =>
    // for voice search icon with clear icon
    props.showVoiceSearch &&
    props.showClear &&
    css`
      padding-right: 66px;
    `};
  ${props =>
    // for voice search icon with search icon
    props.showVoiceSearch &&
    props.showIcon &&
    props.iconPosition === 'right' &&
    css`
      padding-right: 66px;
    `};
  ${props =>
    // for clear icon with search icon and voice search
    props.showClear &&
    props.showIcon &&
    props.showVoiceSearch &&
    props.iconPosition === 'right' &&
    css`
      padding-right: 90px;
    `};
`;

export default Input;
