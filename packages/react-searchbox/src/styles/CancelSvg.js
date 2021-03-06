import React from 'react';
import { func } from '../utils/types';

const CancelSvg = ({ onClick }) => (
  	<svg onClick={onClick}	alt="Clear"
		className="cancel-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><title>Clear</title><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
);

CancelSvg.propTypes = {
  onClick: func
};

export default CancelSvg;
