import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Section } from '../styles';
import H2 from '../styles/H2';
import Button from '@appbaseio/designkit/lib/atoms/Button';


const ComparsionSection = ({ theme }) => (
  <Section
    css={`
      background: ${theme.primary};
    `}
  >
    <H2
      css={`
        margin-bottom: 20px;
        color: ${theme.textLight};
        font-weight: 500;
      `}
    >
      Searchbox v/s ReactiveSearch
    </H2>{' '}
    <p
      css={`
        max-width: 700px;
        margin: 0 auto;
        color: ${theme.textLight} !important;
      `}
    >
      We recommend using Searchbox over DataSearch or CategorySearch components
      of ReactiveSearch when you only need to integrate a searchbox UI component
      into your app. If you are planning to use other UI filters or result
      components, it is ideal to use the ReactiveSearch library instead of this
      standalone component.
    </p>
    <Button
      href="https://github.com/appbaseio/searchbox#searchbox-vs-reactivesearch"
      uppercase
      big
      bold
      style={{
        backgroundColor: theme.secondary,
        fontSize: '14px',
        lineHeight: '19px',
        fontWeight: 'bold',
        color: theme.textLight,
        marginTop: 20,
      }}
    >
      Learn More
    </Button>
  </Section>
);

export default ComparsionSection;
