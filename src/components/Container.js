import React from 'react';

const Container = ({
  children,
  className,
  subtitle,
  title,
  description,
  showInfo = true
}) => (
  <div
    className={`relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 ${className ||
      ''}`}
  >
    {showInfo ? (
      <div className="text-center lg:text-left">
        {subtitle ? (
          <p className="text-base mb-2 leading-6 text-pink-500 font-semibold tracking-wide uppercase">
            {subtitle}
          </p>
        ) : null}
        <h3 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          {title}
        </h3>
        <p className="mt-4 text-xl leading-7 text-gray-500 lg:mx-auto">
          {description}
        </p>
      </div>
    ) : null}
    {children}
  </div>
);

export default Container;
