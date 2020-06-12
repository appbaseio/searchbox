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
    title: 'React + ElasticSearch = ❤️',
    description:
      'Lightweight and performance oriented search box UI component library for React.',
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
    title: 'Features',
    description:
      'We have baked some amazing features in libraries which helps getting insights from searches and also help beautify and enhance search experiences.',
    cards: [
      {
        image: {
          src: '../../searchbox/icons/4.png',
          alt: 'Elasticsearch compatible'
        },
        title: 'Elasticsearch compatible',
        description:
          'Connect to an ES index hosted anywhere. Supports v2, v5 and v6.'
      },
      {
        image: {
          src: '../../searchbox/icons/2.png',
          alt: 'Configurable styles'
        },
        title: 'Configurable styles',
        description:
          'Styled components with rich theming and CSS class-injection support.'
      },
      {
        image: {
          src: '../../searchbox/icons/6.png',
          alt: 'Search/Click Analytics'
        },
        title: 'Search/Click Analytics',
        description:
          'Improve your search experience based on the analytics extracted by Appbase.io.'
      },
      {
        image: {
          src: '../../searchbox/icons/1.png',
          alt: 'Voice Search'
        },
        title: 'Voice Search',
        description: 'Enable voice input for searching.'
      },
      {
        image: {
          src: '../../searchbox/icons/3.png',
          alt: 'Autosuggestions'
        },
        title: 'Autosuggestions',
        description:
          'Built-in autosuggest functionality with keyboard accessibility.'
      },

      {
        image: {
          src: '../../searchbox/icons/5.png',
          alt: 'Feature Results'
        },
        title: 'Feature Results',
        description: 'Promote and hide your results for search queries.'
      }
    ]
  },
  banner5: [
    {
      backgroundColor: primary,
      title: 'Build a live app in 5 easy steps',
      description:
        'Go from scratch to creating a data-driven search app with our beginner friendly quick start guide.',
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
        'We offer production support for ReactiveSearch. Work with us to bring your dream project to life.',
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
