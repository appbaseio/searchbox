import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Grid as FlexGrid,Card, Flex } from '@appbaseio/designkit';
import { mediaKey, media } from '../utils';
import { Section, SecondaryLink } from '../styles';
import H2 from '../styles/H2';
import ImageCard from '../styles/ImageCard';
import { Title } from '@appbaseio/designkit/lib/atoms/typography';

const titleCls = css`
  font-size: 1rem;
  font-weight: 600;
  line-height: 30px;
  margin-left: 13px;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const cardCls = css`
  padding: 20px 10px;
  box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.05) !important;
  &:hover {
    box-shadow: 2px 3px 6px 1px rgba(0, 0, 0, 0.05) !important;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const linkCls = css`
  padding: 15px 10px;
  font-size: 0.8rem;
  color: #74767e;

  &:hover {
    color: #424242;
  }
`;

const imagePrefix = '../../searchbox/images/';
const DiscoverRS = ({ cardConfig, currentSelected }) => (
  <Section css="max-width: 950px;margin: 0 auto;background-color: #fff">
    <H2 css="margin-bottom: 20px;">Searchbox libraries</H2>{' '}
    <p css="max-width: 700px;margin: 0 auto 64px auto">
      Build consistent, cross-platform search UIs that delight your users
    </p>
    <FlexGrid
      size={3}
      lgSize={3}
      smSize={1}
      gutter="20px"
      lgGutter="12px"
      smGutter="0px"
      style={{
        marginTop: '60px'
      }}
    >
      {cardConfig.map((card, index) => (
        <Card css={cardCls}>
          <img src={`${imagePrefix}/${card.src}`} alt={card.name} />
          <Title css={titleCls}>{card.title}</Title>
          <SecondaryLink
            target="_blank"
            rel="noopener noreferrer"
            href={card.href}
            css={linkCls}
          >
            Getting Started
          </SecondaryLink>

          <SecondaryLink
            target="_blank"
            rel="noopener noreferrer"
            href={card.demo}
            css={linkCls}
          >
            Demo
          </SecondaryLink>
        </Card>
      ))}
    </FlexGrid>
  </Section>
);

DiscoverRS.propTypes = {
  cardConfig: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      srcSet: PropTypes.string,
      href: PropTypes.string
    })
  ),
  currentSelected: PropTypes.string
};

DiscoverRS.defaultProps = {
  cardConfig: [
    {
      title: 'React',
      src: 'Searchbox_React@1x.png',
      href:
        'https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/',
      name: 'web',
      demo:
        'https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/react-searchbox/examples/basic'
    },
    {
      title: 'Vue',
      src: 'Searchbox_Vue@3x.png',
      href:
        'https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/',
      name: 'vue',
      demo:
        'https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/vue-searchbox/examples/basic'
    },
    {
      title: 'Vanilla JS',
      src: 'Searchbox_JS@3x.png',
      href: 'https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/',
      name: 'vanilla',
      demo:
        'https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/searchbox/examples/searchbar-with-style'
    }
  ],
  currentSelected: ''
};

export default DiscoverRS;
