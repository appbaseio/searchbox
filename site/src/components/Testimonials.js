import React from 'react';
import Container from './Container';
import Button from './Button';

const imageConfig = [
  {
    srcSet:
      '../../searchbox/images/testimonials/dol/logo@1x.png 1x, ../../searchbox/images/testimonials/dol/logo@2x.png 2x,../../searchbox/images/testimonials/dol/logo@3x.png 3x',
    alt: 'US Department of Labor'
  },
  {
    srcSet:
      '../../searchbox/images/testimonials/fbresearch/logo@1x.png 1x, ../../searchbox/images/testimonials/fbresearch/logo@2x.png 2x,../../searchbox/images/testimonials/fbresearch/logo@3x.png 3x',
    alt: 'Facebook Research'
  },
  {
    srcSet:
      '../../searchbox/images/testimonials/rumbleon/rumbleon@1x.png 1x, ../../searchbox/images/testimonials/rumbleon/rumbleon@2x.png 2x,../../searchbox/images/testimonials/rumbleon/rumbleon@3x.png 3x',
    alt: 'RumbleOn'
  },
  {
    srcSet:
      '../../searchbox/images/testimonials/betagov/logo@1x.png 1x, ../../searchbox/images/testimonials/betagov/logo@2x.png 2x,../../searchbox/images/testimonials/betagov/logo@3x.png 3x',
    alt: 'beta.gouv.fr'
  },
  {
    srcSet:
      '../../searchbox/images/testimonials/nasa/Nasa@1x.png 1x, ../../searchbox/images/testimonials/nasa/Nasa@2x.png 2x,../../searchbox/images/testimonials/nasa/Nasa@3x.png 3x',
    alt: 'Nasa'
  },
  {
    srcSet:
      '../../searchbox/images/testimonials/reactioncommerce/logo@1x.png 1x, ../../searchbox/images/testimonials/reactioncommerce/logo@2x.png 2x,../../searchbox/images/testimonials/reactioncommerce/logo@3x.png 3x',
    alt: 'ReactionCommerce'
  }
];

const Testimonials = () => (
  <Container
    title="Trusted by these awesome folks"
    className="bg-gray-100"
  >
    <div className="mt-10 gap-8 sm:gap-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {imageConfig.map(image => (
        <div className="col-span-1 h-24 flex justify-center items-center">
          <img className="h-100" {...image} />
        </div>
      ))}
    </div>
  </Container>
);

export default Testimonials;
