import { css } from '@emotion/core';

const suggestions = css`
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.9rem;
  z-index: 3;
  position: absolute;
  top: 41px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 390px;
  overflow-y: auto;
  box-sizing: border-box;

  &.small {
    top: 30px;
  }

  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    user-select: none;

    .trim {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover,
    &:focus {
      background-color: #eee;
    }

    .highlight-class {
      font-weight: 600;
      padding: 0;
      background-color: transparent;
      color: inherit;
    }
  }
`;

const suggestionsContainer = css`
  position: relative;
  .cancel-icon {
    cursor: pointer;
  }
  .no-suggestions {
    border: 1px solid #ccc;
    border-top: 0;
    font-size: 0.9rem;
    padding: 10px;
  }
`;

export { suggestionsContainer, suggestions };
