import React from 'react';

export default () => (
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 shadow-lg">
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="w-0 flex-1 flex">
          <a href="#" class="flex items-center">
            <img
              class="h-8 w-auto sm:h-10"
              src="../../searchbox/images/RSlogo.svg"
              alt="Workflow"
            />
            <span className="ml-2 text-xl text-gray-800">Searchbox</span>
          </a>
        </div>
        <div class="md:flex items-center justify-end space-x-8 md:flex-1">
          <span class="inline-flex rounded-md shadow-sm">
            <a
              href="#"
              class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150"
            >
              Support
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
);
