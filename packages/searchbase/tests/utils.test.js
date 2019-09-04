import {
  extractSuggestion,
  flatten,
  getSuggestions,
  highlightResults,
  parseHits
} from '../src/utils';

import { hits, parsedHits } from '../tests_data/hit';
import {
  nestedFields,
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

test('suggestions with nested fields with empty output', () => {
  expect(getSuggestions(['original_title.search'], nestedFields)).toEqual([]);
});

test('flatten array', () => {
  expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  expect(flatten([1, 2, 3, [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  expect(flatten([1, 2, 3, [4, 5, [8, 9]]])).toEqual([1, 2, 3, 4, 5, 8, 9]);
  //  edge case
  expect(flatten([[]])).toEqual([]);
});

test('extract suggestions', () => {
  // array
  expect(extractSuggestion([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
  // object
  expect(extractSuggestion({ key1: 1, key2: 2 })).toEqual(null);
  //  string
  expect(extractSuggestion('hello')).toEqual('hello');
});
