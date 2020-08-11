import React from 'react';
import Button from './Button';
import GithubButton from './GithubButton';

const Header = () => {
  return (
    <main class="h-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-16 mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:text-left lg:py-32">
        <div class="px-4 sm:px-8 xl:pr-16">
          <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-pink-500 sm:leading-none lg:text-5xl xl:text-6xl">
            Searchbox for Elasticsearch
          </h2>
          <p class="mt-3 mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Lightweight and performance focused search UI library to query and
            display results from Elasticsearch.
          </p>
          <div class="mt-8 flex-wrap items-center flex lg:justify-start justify-center">
              <Button className="mr-3" big>
                Get Started
              </Button>
              <GithubButton />
              <Button className="ml-3" inverse big>
                Docs
              </Button>
          </div>
        </div>
        <div class="h-0 md:h-64">
          <img
            class="hidden md:block object-cover mx-auto"
            src="../../images/hero.svg"
            alt="Woman on her phone"
          />
        </div>
      </div>
    </main>
  );
};

export default Header;
