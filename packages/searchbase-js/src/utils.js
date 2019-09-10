export const uniqueId = (prefix = '') => {
  let idCounter = 0;
  idCounter += 1;
  return `${prefix}${idCounter}`;
};

export const getRelativePosition = (element1, element2) => {
  const position1 = element1.getBoundingClientRect();
  const position2 = element2.getBoundingClientRect();

  const positionAbove =
    position1.bottom + position2.height > window.innerHeight &&
    window.innerHeight - position1.bottom < position1.top &&
    window.pageYOffset + position1.top - position2.height > 0;

  return positionAbove ? 'above' : 'below';
};

export const getDOMAttributes = ({ selectedIndex, index }) => {
  const attributes = {
    id: `autocomplete-suggestion-${index}`,
    class: 'autocomplete-suggestion',
    role: 'option',
    'data-suggestion-index': index,
    'aria-selected': selectedIndex === index
  };

  const attributesToString = Object.keys(attributes).reduce((agg, key) => {
    return `${agg} ${key}="${attributes[key]}"`;
  }, '');

  return attributesToString;
};
