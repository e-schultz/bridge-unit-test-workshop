import React from 'react';
import ReactDOM from 'react-dom';
//import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import HackerNewsSearchX from './HackerNewsSearch';
import HackerNewsSearch from './HackerNewsSearchCls';
import axios from 'axios';
jest.mock('axios');
jest.useFakeTimers();
// uncomment to show how to mock out a child component for a shallow render
/* 
jest.mock('./SearchResultList.js', () => {
  return jest.fn(() => <div>Serch Results</div>);
});
*/
describe('the hacker news search', () => {
  test('should display a placeholder while waiting for the results', async () => {
    const promise = Promise.resolve();
    axios.get.mockResolvedValueOnce({ data: { hits: [] } });
    const { getByTestId } = render(<HackerNewsSearch query="react" />);
    // how can we see what the render markup will look like?
    // bug using the debug that is returned by render
    // element.debug();
    // we can import '@testing-library/jest-dom/extend-expect';
    // to extend expect with helpers to make common things easier
    //
    expect(getByTestId('loadingPlaceholder')).toHaveTextContent(
      '...... please wait while searching for react'
    );
    // the promise wont be 'settled' before this point
    // so we can see that the loading indicator is working
    await act(() => promise);
  });

  test('should display results once returned from the API', async () => {
    // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

    axios.get.mockResolvedValueOnce({
      data: {
        hits: [
          {
            url: 'https://someurl.com',
            title: 'some title',
            objectID: '123456',
          },
        ],
      },
    });
    const { getByLabelText } = render(<HackerNewsSearch query="react" />);
    // advance the timers by a second to kick off the first request
    act(() => jest.advanceTimersByTime(1000));

    expect(await screen.findByText(/some title/i)).toBeInTheDocument();
    const link = getByLabelText(/read more about some title/i);
    expect(link).toHaveTextContent('some title');
    expect(link).toHaveAttribute('href', 'https://someurl.com');

    // this is currently making an API call
    // which will not complete in our tests - we need to mock out axios
  });
});
