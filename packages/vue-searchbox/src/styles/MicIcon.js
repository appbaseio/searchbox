import styled from '@appbaseio/vue-emotion';
import { css } from 'emotion';

const right = css`
  right: 35px;
`;

const MicIcon = styled('div')`

  position: absolute;
  display:flex;
align-items:center;
  top: 50%;
  transform:translateY(-50%);
  cursor: pointer;
  right: 15px;
  ${({ iconPosition, showClear }) => {
		if (showClear && iconPosition !== 'left')
			return css`
        right: 51px;
      `;
		if (iconPosition === 'right' || showClear) {
			return right;
		}
		return null;
	}}
  ${({ showIcon, showClear }) => {
		if (!showIcon && showClear)
			return css`
        right: 32px;
      `;
		if (!showIcon && !showClear)
			return css`
        right: 15px;
      `;
		return null;
	}}
  width: 11px;
`;

export default MicIcon;
