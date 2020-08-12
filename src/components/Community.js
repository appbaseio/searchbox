import React from 'react';
import Container from './Container';

const links = [
  {
    text: 'Documentation',
    image: '../../images/support/Documentation.svg',
    description:
      'Dive in to learn all about Search UI development for all platforms',
    link: 'https://docs.appbase.io/docs/reactivesearch/gettingstarted/'
  },

  {
    text: 'Tutorials',
    image: '../../images/support/Tutorials.svg',
    description: 'Get inspiration with these tutorial guides.',
    link: 'https://medium.appbase.io/tagged/javascript'
  },
  {
    text: 'Support',
    image: '../../images/support/Support.png',
    description: 'Get first-class support from appbase.io for your search.',
    link: 'https://appbase.io/support'
  },
  {
    text: 'Gitter',
    image: '../../images/support/Gitter.svg',
    description: 'Join our community on Gitter.',
    link: 'https://gitter.im/appbaseio/reactivesearch'
  }
];

const Community = () => (
  <Container
    subtitle="Resources"
    title="Need Help?"
    description="Resources to get help with ReactiveSearch."
  >
    <div className="grid grid-cols-1 gap-8 justify-center md:grid-cols-2 lg:grid-cols-4 lg:justify-start mt-8 rounded-sm">
      {links.map(({ text, image, description, link }) => (
        <a
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          className="text-center bg-white p-4 border border-gray-50 lg:text-left hover:shadow-md focus:border transition ease-in duration-200"
        >
          <img src={image} alt={text} className="h-24 mx-auto lg:mx-0" />
          <h6 className="text-lg leading-6 font-medium mt-5 text-gray-900">
            {text}
          </h6>
          <p className="mt-2 text-base leading-6 text-gray-500">{description}</p>
        </a>
      ))}
    </div>
  </Container>
);

export default Community;
