import React from 'react';
//import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';

import HackerNewsSearch, { API } from '../components/HackerNewsSearch';
import HackerNewsSearchX, {
  API as API_X,
} from '../components/HackerNewsSearchCls';

import axios from 'axios';

// links to documentation / extra resources:
// * https://jestjs.io/docs/en/asynchronous
// * https://jestjs.io/docs/en/jest-object#mock-timers
// * https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

jest.mock('axios');
jest.useFakeTimers();

// uncomment to show how to mock out a child component for a shallow render

/* 
jest.mock('./SearchResultList.js', () => {
  return jest.fn(() => <div>Serch Results</div>);
});
*/
// The HackerNewsSearch is the component that will query the HackerNews
// API, and display the search results.
//
// There is also a loading indicator while waiting for results.
//
// Some of the functionality we will want to test for is
// * Does the loading indicator display
// * Do the search results display
//
// In addition to this, since this component is making an API call using
// axios - how can we handle this and not have to call the actual API?

describe('the hacker news search', () => {
  // how can we see what the render markup will look like?
  // bug using the debug that is returned by render
  // element.debug();
  // we can import '@testing-library/jest-dom/extend-expect';
  // to extend expect with helpers to make common things easier

  // Verify that the '... please wait' displays before we have search results
  // * setup a mock axios get call
  // * render the component with, and pass in the query param
  // * check if there is text content
  // extra resource: // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  test('should display a placeholder while waiting for the results', async () => {
    expect(1).toBe(1);
  });

  // Once we have the data from the API, we want to verify that it is displayed on
  // the screen, to do this we will need to
  //
  // * mock out the axios get request
  // * wait for the loading indicator to not display
  // * verify that the search results are on the screen
  //
  // To help with this, we will also need to use jests fake timers.

  test('should display results once returned from the API', async () => {
    expect(1).toBe(1);
  });

  // Sometimes it can be useful to verify that we are calling the correct
  // URL in our API calls
  // This could be considered a different area of concern than displaying
  // the results once they return.
  //
  // * Create a test to mount the component with a search term
  // * verify that it has been called with the correct URL
  test('should call the API with the search term provided', async () => {
    expect(1).toBe(1);
  });

  test('should query the api with a new term if the provided query changes', async () => {
    const promise = Promise.resolve();
    expect(1).toBe(1);
    await act(() => promise);
  });
});
