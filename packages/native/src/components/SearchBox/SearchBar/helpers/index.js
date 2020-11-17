import renderNode from './renderNode';
import nodeType from './nodeType';

export const patchWebProps = ({
  updateTheme,
  replaceTheme,
  onClear,
  ...rest
}) => {
  return rest;
};

export { renderNode, nodeType };
