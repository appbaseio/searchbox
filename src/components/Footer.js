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
          <a
            href="mailto:info@appbase.io"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-gray-400 hover:text-gray-500 text-base leading-6 hover:underline"
          >
            info@appbase.io
          </a>
          <div className="mt-2 flex justify-center lg:justify-start">
            <a
              href="https://github.com/appbaseio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <img srcSet="../../images/footer/Github@3x.svg 3x, ../../images/footer/Github@2x.png 2x, ../../images/footer/Github@1x.png" />
            </a>

            <a
              href="https://medium.appbase.io"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Medium</span>
              <img srcSet="../../images/footer/Medium@3x.svg 3x, ../../images/footer/Medium@2x.png 2x, ../../images/footer/Medium@1x.png" />
            </a>
            <a
              href="https://twitter.com/appbaseio"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <img srcSet="../../images/footer/Twitter@3x.svg 3x, ../../images/footer/Twitter@2x.png 2x, ../../images/footer/Twitter@1x.png" />
            </a>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 xs:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
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
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    React
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/vue/overview/QuickStart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Vue.JS
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Reactive Maps
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/native/overview/QuickStart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
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
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    React Searchbox
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Vue Searchbox
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Javascript Searchbox
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.appbase.io/docs/reactivesearch/searchbase/overview/QuickStart/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
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
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://stackoverflow.com/questions/tagged/reactivesearch"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Stackoverflow
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/appbaseio"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
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
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Medium Publication
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://docs.appbase.io/"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    Appbase.io Docs
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:support@appbase.io"
                    className="text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"
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
