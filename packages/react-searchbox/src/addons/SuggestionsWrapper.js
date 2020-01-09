import React from 'react';
import { getClassName } from '../utils/helper';

const SuggestionWrapper = ({
  className,
  children,
  innerClassName,
  innerClass
}) => (
  <div
    className={`${className} ${getClassName(innerClass, innerClassName || '')}`}
  >
    {children}
  </div>
);

export default SuggestionWrapper;
