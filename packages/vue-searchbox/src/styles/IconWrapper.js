import styled, { css } from '@appbaseio/vue-emotion';

const IconWrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 23px;
	width: max-content;
	cursor: pointer;
	height: 100%;min-width:20px;

	svg.search-icon {
		fill: #0B6AFF;
	}

	svg.cancel-icon {
		fill: #595959;
	}
`;

export default IconWrapper;
