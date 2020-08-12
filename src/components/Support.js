import React from 'react';
import Button from './Button';

const Support = () => (
  <div className="text-center lg:text-left grid grid-cols-1 lg:grid-cols-2">
    <div className="bg-indigo-800 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="text-base leading-6 font-semibold uppercase tracking-wider text-pink-500">
        Tutorial
      </div>
      <h2 className="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
        Build a live search app in a minute
      </h2>
      <p className="mt-3 text-lg leading-7 text-gray-300">
        Check out our 1-min interactive guide to get started with building your
        first search app.
      </p>
      <div className="mt-8">
        <div className="inline-flex rounded-md shadow">
          <Button link="https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/">
            Get Started
          </Button>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Button link="https://docs.appbase.io/" ghost>
            Docs
          </Button>
        </div>
      </div>
    </div>
    <div className="bg-indigo-900 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="text-base leading-6 font-semibold uppercase tracking-wider text-pink-500">
        We’re here to help
      </div>
      <h2 className="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
        Get dedicated support
      </h2>
      <p className="mt-3 text-lg leading-7 text-gray-300">
        We offer dedicated support for Searchbox. Work with us to bring your
        dream project to life.
      </p>
      <div className="mt-8">
        <div className="inline-flex rounded-md shadow">
          <Button link="https://appbase.io/pricing#support">
            Support Plans
          </Button>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Button link="https://appbase.io/contact" ghost>
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Support;
