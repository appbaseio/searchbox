import styled from '@emotion/styled';
import { css } from '@emotion/core';

const primary = () => css`
  background-color: #0b6aff;
  color: #fff;

  &:hover {
    background-color: #0b6aff;
    filter: brightness(0.9);
  }

  &:active {
    background-color: #0b6aff;
    filter: brightness(1.1);
  }
`;

const Button = styled('a')`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 1px solid transparent;
  min-height: 30px;
  word-wrap: break-word;
  padding: 5px 12px;
  line-height: 1.2rem;
  background-color: #eee;
  color: #000;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover,
  &:focus {
    background-color: #ccc;
  }

  &:focus {
    outline: 0;
    border-color: rgba(#0b6aff, 0.6);
    box-shadow: 0 0 0 2px rgba(#0b6aff, 0.3);
  }

  ${props => (props.primary ? primary : null)};

  &.enter-btn {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

export default Button;
