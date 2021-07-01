import styled from '@appbaseio/vue-emotion';
import { css } from 'emotion';

const left = css`
  padding-left: 12px;
  left: 0;
`;

const right = css`
  padding-right: 12px;
  right: 0;
`;

const clear = css`
  padding-right: 32px;
  right: 0;
`;


const paddingRight = css`
  padding-right: 10px;
`;

const InputIcon = styled('div')`
  position: absolute;display:flex;
align-items:center;
  top: 50%;
  transform:translateY(-50%);
  cursor: pointer;
  ${({ iconPosition }) => {
		if (iconPosition === 'left') {
			return left;
		}
		if (iconPosition === 'right') {
			return right;
		}
		return null;
	}};
  ${({ clearIcon }) => clearIcon && clear};
  ${({ showIcon }) => !showIcon && paddingRight};

  svg.search-icon {
    fill: #0b6aff;
  }
`;

export default InputIcon;
