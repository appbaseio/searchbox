import theme from '../../theme/web';
import baseConfig from '../base/web';

const { primary, primaryDark } = theme;

const baseConfigHeader = {
  ...baseConfig.header,
  links: baseConfig.header.links,
};
export default {
  ...baseConfig,
  header: baseConfigHeader,
  banner1: {
    title: 'Searchbox for Elasticsearch',
    description:
      'Lightweight and performance focused search UI library to query and display results from Elasticsearch.',
    image: {
      src: '../../searchbox/images/browser@2x.png',
      alt: 'Reactive Search Components'
    },
    button: {
      title: 'Get Started',
      href:
        'https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/'
    },
    link: {
      title: 'Docs',
      href:
        'https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/'
    }
  },
  banner3: {
    title: 'Benefits',
    description:
      'Lightweight, performance optimized and built for creating production grade search experiences',
    cards: [
      {
        image: {
          src: '../../searchbox/icons/4.png',
          alt: 'Elasticsearch compatible'
        },
        title: 'Elasticsearch compatible',
        description:
          'Connect to an ElasticSearch index hosted anywhere. Supports v5, v6 and v7.'
      },
      {
        image: {
          src: '../../searchbox/icons/2.png',
          alt: 'Configurable styles'
        },
        title: 'Configurable styles',
        description:
          'Styled searchbox component with rich theming and CSS class-injection support.'
      },
      {
        image: {
          src: '../../searchbox/icons/6.png',
          alt: 'Search & Click Analytics'
        },
        title: 'Search & Click Analytics',
        description:
          'Record search and click analytics with appbase.io to understand the business impact of search.'
      },
      {
        image: {
          src: '../../searchbox/icons/1.png',
          alt: 'Voice Search'
        },
        title: 'Voice Search',
        description: 'Enable searching with voice input.'
      },
      {
        image: {
          src: '../../searchbox/icons/3.png',
          alt: 'Autosuggestions'
        },
        title: 'Auto suggestions',
        description:
          'Use built-in auto suggestions and highlighting with keyboard accessibility.'
      },

      {
        image: {
          src: '../../searchbox/icons/5.png',
          alt: 'Promote Results'
        },
        title: 'Promote Results',
        description: 'use appbase.io to merchandise and feature banners or results on specific search terms.'
      }
    ]
  },
  banner5: [
    {
      backgroundColor: primary,
      title: 'Build a live search app in a minute',
      description:
        'Check out our 1-min interactive guide to get started with building your first search app.',
      button: {
        title: 'Get Started',
        href:
          'https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/'
      },
      link: {
        title: 'Docs',
        href: 'https://docs.appbase.io/'
      }
    },
    {
      backgroundColor: primaryDark,
      title: 'Get dedicated support',
      description:
        'We offer dedicated support for Searchbox. Work with us to bring your dream project to life.',
      button: {
        title: 'SUPPORT PLANS',
        href: 'https://appbase.io/pricing#support'
      },
      link: {
        title: 'Get in touch',
        href: 'https://appbase.io/contact'
      }
    }
  ]
};
