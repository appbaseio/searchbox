import React from 'react';
import Button from './Button';
import GithubButton from './GithubButton';

const Header = () => {
  return (
    <main className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-16 mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:text-left lg:py-32">
        <div className="px-4 sm:px-8 xl:pr-16">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-pink-500 sm:leading-none lg:text-5xl xl:text-6xl">
            Searchbox for Elasticsearch
          </h2>
          <p className="mt-3 mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Lightweight and performance focused search UI library to query and
            display results from Elasticsearch.
          </p>
          <div className="mt-8 flex-wrap items-center flex lg:justify-start justify-center">
            <Button
              link="https://github.com/appbaseio/searchbox/tree/master/packages/react-searchbox"
              className="mr-3"
              big
            >
              Get Started
            </Button>
            <GithubButton />
            <Button
              link="https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/"
              className="ml-3"
              inverse
              big
            >
              Docs
            </Button>
          </div>
        </div>
        <div className="h-0 md:h-64">
          <img
            className="hidden md:block object-cover mx-auto"
            src="../../images/hero.svg"
            alt="Woman on her phone"
          />
        </div>
      </div>
    </main>
  );
};

export default Header;
