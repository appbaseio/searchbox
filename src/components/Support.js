import React from 'react';
import Button from './Button';

const Support = () => (
  <div class="text-center lg:text-left grid grid-cols-1 lg:grid-cols-2">
    <div class="bg-indigo-800 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="text-base leading-6 font-semibold uppercase tracking-wider text-pink-500">
        Tutorial
      </div>
      <h2 class="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
        Build a live search app in a minute
      </h2>
      <p class="mt-3 text-lg leading-7 text-gray-300">
        Check out our 1-min interactive guide to get started with building your
        first search app.
      </p>
      <div class="mt-8">
        <div class="inline-flex rounded-md shadow">
          <Button color="pink">Get Started</Button>
        </div>
        <div class="ml-3 inline-flex rounded-md shadow">
          <Button ghost>Docs</Button>
        </div>
      </div>
    </div>
    <div class="bg-indigo-900 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="text-base leading-6 font-semibold uppercase tracking-wider text-pink-500">
        We’re here to help
      </div>
      <h2 class="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
        Get dedicated support
      </h2>
      <p class="mt-3 text-lg leading-7 text-gray-300">
        We offer dedicated support for Searchbox. Work with us to bring your
        dream project to life.
      </p>
      <div class="mt-8">
        <div class="inline-flex rounded-md shadow">
          <Button color="pink">Support Plans</Button>
        </div>
        <div class="ml-3 inline-flex rounded-md shadow">
          <Button ghost>Get in Touch</Button>
        </div>
      </div>
    </div>
  </div>
);

export default Support;
