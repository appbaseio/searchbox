import React from 'react';
import Header from '../../components/Header';
import ImageCard from '../../components/ImageCard';
import Features from '../../components/Features';
import Testimonials from '../../components/Testimonials';
import Support from '../../components/Support';
import Layout from '../../components/Layout';
import Community from '../../components/Community';
import Button from '../../components/Button';
import Container from '../../components/Container';

export default () => (
  <Layout>
    <Header />
    <ImageCard
      title="Searchbox libraries"
      description="Build consistent, cross-platform search UIs that delight your users"
      cards={[
        {
          title: 'React',
          image: '/searchbox/images/Searchbox_React@1x.png',
          links: [
            {
              text: 'Get Started',
              link:
                'https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/',
              buttonProps: {
                inverse: true
              }
            },
            {
              text: 'Demo',
              link:
                'https://codesandbox.io/s/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/demo'
            }
          ]
        },
        {
          title: 'Vue',
          image: '/searchbox/images/Searchbox_Vue@3x.png',
          links: [
            {
              text: 'Get Started',
              link:
                'https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/',
              buttonProps: {
                inverse: true
              }
            },
            {
              text: 'Demo',
              link:
                'https://codesandbox.io/s/github/appbaseio/searchbox/tree/master/packages/vue-searchbox/examples/basic'
            }
          ]
        },
        {
          title: 'Javascript',
          image: '/searchbox/images/Searchbox_JS@3x.png',
          links: [
            {
              text: 'Get Started',
              link:
                'https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/',
              buttonProps: {
                inverse: true
              }
            },
            {
              text: 'Docs',
              link:
                'https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/searchbox/examples/searchbar-with-style'
            }
          ]
        }
      ]}
    />
    <Features
      title="Benefits"
      description="Lightweight, performance optimized and built for creating production grade search experiences"
      features={[
        {
          image: {
            src: '/searchbox/icons/elasticsearch.svg',
            alt: 'Elasticsearch compatible'
          },
          title: 'Elasticsearch compatible',
          description:
            'Connect to an ElasticSearch index hosted anywhere. Supports v5, v6 and v7.'
        },
        {
          image: {
            src: '/searchbox/icons/color_pallete.svg',
            alt: 'Configurable styles'
          },
          title: 'Configurable styles',
          description:
            'Styled searchbox component with rich theming and CSS class-injection support.'
        },
        {
          image: {
            src: '/searchbox/icons/search_click_analytics.svg',
            alt: 'Search & Click Analytics'
          },
          title: 'Search & Click Analytics',
          description:
            'Record search and click analytics with appbase.io to understand the business impact of search.'
        },
        {
          image: {
            src: '/searchbox/icons/voice_search.svg',
            alt: 'Voice Search'
          },
          title: 'Voice Search',
          description: 'Enable searching with voice input.'
        },
        {
          image: {
            src: '/searchbox/icons/autosuggestions.svg',
            alt: 'Autosuggestions'
          },
          title: 'Auto suggestions',
          description:
            'Use built-in auto suggestions and highlighting with keyboard accessibility.'
        },

        {
          image: {
            src: '/searchbox/icons/promote_results.svg',
            alt: 'Promote Results'
          },
          title: 'Promote Results',
          description:
            'use appbase.io to merchandise and feature banners or results on specific search terms.'
        }
      ]}
    />
    <Testimonials />
    <Support />
    <Container title="Get started in minutes">
      <div className="text-center">
        <Button href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/">
          Build my first app
        </Button>
      </div>
    </Container>
    <Community />
  </Layout>
);
