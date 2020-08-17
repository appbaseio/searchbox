import React from 'react';
import Container from './Container';

export default ({ features, title, subtitle, description }) => (
  <Container
    className="bg-white"
    title={title}
    subtitle={subtitle}
    description={description}
  >
    <div>
      {features ? (
        <div className="mt-5 lg:mt-10">
          <div className="py-10 lg:py-12 bg-white">
            <div className="text-center grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-3 md:grid-cols-2">
              {features.map(feature => (
                <div className="mt-10 lg:mt-0">
                  <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-md text-white">
                    <img src={feature.image.src} alt={feature.image.alt} />
                  </div>
                  <div className="mt-5">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      {feature.title}
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  </Container>
);
