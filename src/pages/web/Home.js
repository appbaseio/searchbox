import React from 'react';
import Header from '../../components/Header';
import ImageCard from '../../components/ImageCard';
import Features from '../../components/Features';
import Testimonials from '../../components/Testimonials';
import Support from '../../components/Support';
import Layout from '../../components/Layout';
import Community from '../../components/Community';

export default () => (
  <Layout>
    <Header />
    <ImageCard
      title="Searchbox libraries"
      subtitle="Framework Support"
      description="Build consistent, cross-platform search UIs that delight your users"
      cards={[
        {
          title: 'React',
          image: '../../searchbox/images//Searchbox_React@1x.png',
          links: [
            {
              text: 'Get Started',
              link: '#'
            },
            {
              text: 'Docs',
              link: '#'
            }
          ]
        },
        {
          title: 'Vue',
          image: '../../searchbox/images//Searchbox_Vue@3x.png',
          links: [
            {
              text: 'Get Started',
              link: '#'
            },
            {
              text: 'Docs',
              link: '#'
            }
          ]
        },
        {
          title: 'Javascript',
          image: '../../searchbox/images//Searchbox_JS@3x.png',
          links: [
            {
              text: 'Get Started',
              link: '#'
            },
            {
              text: 'Docs',
              link: '#'
            }
          ]
        }
      ]}
    />
    <Features
      title="Better Search"
      subtitle="Benefits"
      description="Lightweight, performance optimized and built for creating production grade search experiences"
      features={[
        {
          image: {
            src: '../../icons/elasticsearch.svg',
            alt: 'Elasticsearch compatible'
          },
          title: 'Elasticsearch compatible',
          description:
            'Connect to an ElasticSearch index hosted anywhere. Supports v5, v6 and v7.'
        },
        {
          image: {
            src: '../../icons/color_pallete.svg',
            alt: 'Configurable styles'
          },
          title: 'Configurable styles',
          description:
            'Styled searchbox component with rich theming and CSS class-injection support.'
        },
        {
          image: {
            src: '../../icons/search_click_analytics.svg',
            alt: 'Search & Click Analytics'
          },
          title: 'Search & Click Analytics',
          description:
            'Record search and click analytics with appbase.io to understand the business impact of search.'
        },
        {
          image: {
            src: '../../icons/voice_search.svg',
            alt: 'Voice Search'
          },
          title: 'Voice Search',
          description: 'Enable searching with voice input.'
        },
        {
          image: {
            src: '../../icons/autosuggestions.svg',
            alt: 'Autosuggestions'
          },
          title: 'Auto suggestions',
          description:
            'Use built-in auto suggestions and highlighting with keyboard accessibility.'
        },

        {
          image: {
            src: '../../icons/promote_results.svg',
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
    <Community />
  </Layout>
);
