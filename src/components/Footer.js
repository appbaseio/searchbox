import React from 'react';

const Footer = () => (
  <div className="bg-gray-900">
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8 justify-center text-center lg:text-left lg:justify-start">
        <div className="xl:col-span-1">
          <img
            className="h-10 mx-auto lg:mx-0"
            src="https://opensource.appbase.io/reactivesearch/images/logo.svg"
            alt="Appbase.io"
          />
          <p className="mt-8 text-gray-500 text-base leading-6">
            Build the best app search experience.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <a
              href="https://twitter.com/appbaseio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://github.com/appbaseio"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                Reactivesearch
              </h4>
              <ul className="mt-4">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/v3/overview/quickstart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    React
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/vue/overview/QuickStart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Vue.JS
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Reactive Maps
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/native/overview/QuickStart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    React Native
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                Searchbox
              </h4>
              <ul className="mt-4">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    React Searchbox
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Vue Searchbox
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Javascript Searchbox
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/searchbase/overview/QuickStart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Searchbase
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                Community
              </h4>
              <ul className="mt-4">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/appbaseio/searchbox/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Github
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://stackoverflow.com/questions/tagged/reactivesearch"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Stackoverflow
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/appbaseio"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                More
              </h4>
              <ul className="mt-4">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://medium.appbase.io/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Medium Publication
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://docs.appbase.io/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Appbase.io Docs
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:support@appbase.io"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400"
                  >
                    Support Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
