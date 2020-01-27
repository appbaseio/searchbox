import styled from '@emotion/styled';

const left = `
  padding-left: 12px;
  left: 0;
`;

const right = `
  padding-right: 12px;
  right: 0;
`;

const clear = `
  padding-right: 32px;
  right: 0;
  top: 12px;
`;

const InputIcon = styled.div`
  position: absolute;
  top: ${({ isClearIcon }) => (isClearIcon ? '12px' : '13px')};
  cursor: pointer;
  ${({ iconPosition }) => {
    if (iconPosition === 'left') {
      return left;
    } else if (iconPosition === 'right') {
      return right;
    }
    return null;
  }};
  ${({ clearIcon }) => clearIcon && clear};
  ${({ showIcon }) => !showIcon && 'padding-right:10px'};

  svg.search-icon {
    fill: #0b6aff;
  }
`;

export default InputIcon;
