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
  <Container className="bg-gray-100" showInfo={false}>
    <div class="grid gap-8 text-center lg:text-left lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-base mb-2 leading-6 text-pink-500 font-semibold tracking-wide uppercase">
          Testimonials
        </p>
        <h2 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          Trusted by these awesome folks
        </h2>
        <div class="mt-8 sm:flex justify-center lg:justify-start">
          <Button>Create Account</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {imageConfig.map(image => (
          <div className="col-span-1 h-24 flex justify-center items-center">
            <img className="h-100" {...image} />
          </div>
        ))}
      </div>
    </div>
  </Container>
);

export default Testimonials;
