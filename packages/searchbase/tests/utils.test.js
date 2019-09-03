import { getSuggestions, highlightResults, parseHits } from '../src/utils';
import { hits, parsedHits } from '../tests_data/hit';
import {
  suggestions,
  suggestionsWithCurrentValueOut,
  suggestionsWithNoCurrentValueOut
} from '../tests_data/suggestions';

test('highlight results', () => {
  expect(
    highlightResults({
      _index: 'imdb-movies-dataset',
      _type: '_doc',
      _score: 21.498314,
      highlight: {
        title: ['The <mark>Shawshank</mark> Redemption']
      },
      genre: ['Drama', 'Crime'],
      rating: 5
    })
  ).toEqual({
    _type: '_doc',
    _index: 'imdb-movies-dataset',
    _score: 21.498314,
    highlight: { title: ['The <mark>Shawshank</mark> Redemption'] },
    genre: ['Drama', 'Crime'],
    rating: 5,
    _source: { title: 'The <mark>Shawshank</mark> Redemption' }
  });
});

test('parse hits', () => {
  expect(parseHits(hits)).toEqual(parsedHits);
});

test('suggestions with no current value', () => {
  expect(
    getSuggestions(
      ['_id', '_index', '_score', 'original_title.search'],
      suggestions
    )
  ).toEqual(suggestionsWithNoCurrentValueOut);
});

test('suggestions with current value', () => {
  expect(
    getSuggestions(['_id', '_index', '_score'], suggestions, '4292')
  ).toEqual(suggestionsWithCurrentValueOut);
});
