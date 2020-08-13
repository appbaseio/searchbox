import React from 'react';
import Container from './Container';
import Button from './Button';

const ImageCard = ({ title, subtitle, description, cards }) => (
  <Container
    className="bg-gray-100"
    title={title}
    subtitle={subtitle}
    description={description}
  >
    <div className="mt-12 grid gap-10 mx-auto justify-center md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
      {cards.map(card => (
        <div className="flex flex-col text-center rounded-sm border shadow-sm hover:shadow-md transition ease-in-out duration-150 overflow-hidden">
          <div className="flex-shrink-0">
            <img className="w-full" src={card.image} alt="" />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <div>
                <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                  {card.title}
                </h3>
                {card.description ? (
                  <p className="mt-3 text-base leading-6 text-gray-500">
                    {card.description}
                  </p>
                ) : null}
              </div>
              {card.links ? (
                <div className="mt-2 sm:flex sm:justify-center">
                  <div className="mt-2 flex justify-center">
                    {card.links.map((info, index) => (
                      <div
                        className={index !== 0 ? 'ml-3' : ''}
                        key={info.text}
                      >
                        <Button
                          {...(info.buttonProps || { asLink: true })}
                          href={info.link}
                        >
                          {info.text}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Container>
);

export default ImageCard;
