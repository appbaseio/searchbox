import React from 'react';

const getButtonClass = ({
  big,
  theme,
  ghost,
  className: userClass,
  inverse,
  asLink
}) => {
  let className = '';

  if (big) {
    className = `${className} lg:px-6 lg:py-3 lg:text-lg`;
  }

  if (ghost) {
    return `${className} bg-transparent text-white hover:shadow-md hover:text-gray-300 ${userClass}`;
  }

  if (asLink) {
    return `${className} shadow bg-transparent text-${theme}-400 hover:shadow-md hover:text-${theme}-200 ${userClass}`;
  }

  if (theme && inverse) {
    return `${className} text-${theme}-500 shadow bg-white text-white hover:bg-${theme}-500 hover:text-white focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${userClass}`;
  }

  if (theme) {
    return `${className} bg-${theme}-500 text-white hover:bg-${theme}-400 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${userClass}`;
  }

  return `${className} ${userClass}`;
};

const Button = ({
  className = '',
  big = false,
  theme = 'pink',
  inverse = false,
  ghost = false,
  asLink = false,
  href = '#',
  children
}) => {
  const classFromProps = getButtonClass({
    big,
    theme,
    ghost,
    className,
    inverse,
    asLink
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-3 py-2 text-base font-medium rounded-md ${classFromProps}`}
    >
      {children}
    </a>
  );
};

export default Button;
