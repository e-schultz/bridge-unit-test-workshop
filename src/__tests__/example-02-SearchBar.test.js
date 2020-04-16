import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { act, fireEvent, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import SearchBar from '../components/SearchBar';
import SearchBarX from '../components/SearchBarCls';

describe('Search Bar Functionality', () => {
  // When testing components, we generally need to do a few things:
  // * Render the component
  // * Get access to the instance, or DOM
  // * Validate what's in the component - by querying the dom, or other utilities

  test('should set the search input field to the provided initialQuery', () => {
    const div = document.createElement('div');
    const expected = 'Initial Query';
    ReactDOM.render(<SearchBar initialQuery="Initial Query" />, div);
    const actual = div.querySelector('[data-test-id=search-query]').value;
    expect(actual).toBe(expected);
  });

  // React does have some built in testing utilities, but there can be a bit of boilerplate.
  // To help with this, we can use a library called react-testing-lib
  //
  // if not already installed - will need to add the packages
  // * @testing-library/jest-dom
  // * @testing-library/react"
  // * @testing-library/user-event"
  //
  // More documentation is available at: https://testing-library.com/docs/react-testing-library/intro
  // * render docs: - https://testing-library.com/docs/react-testing-library/api#render-result
  // * getByTestId: - https://testing-library.com/docs/dom-testing-library/api-queries#bytestid
  test('should set the search input field to the provided initialQuery - react testing lib', () => {
    const expected = 'Initial Query';

    // TODO: complete test, and make use of getByTestId and render
    const actual = 'Initial Query';

    expect(actual).toBe(expected);
  });

  // Testing Form Events
  // docs: https://testing-library.com/docs/dom-testing-library/api-events
  //
  // When testing components, forms, etc - we want to get as close as we can to
  // how things are working in the application. To do this, we need to trigger DOM
  // events.
  //
  // react testing library has a helper called `fireEvent`
  //
  test('should update the input as the user types', () => {
    const expected = 'New Value';
    const actual = 'New Value';
    expect(actual).toEqual(expected);
  });

  // Our SearchBar takes two props - initialQuery, and onSearch
  // the onSearch is a callback, and we want to verify that it
  // is getting called when the form is submitted
  //
  // * creating a mock function with jest.fn
  // * submitting the form
  // * verify it was called, and what it was called with
  //
  // jest mock docs: https://jestjs.io/docs/en/mock-function-api
  test('should call the provided onSearch callback when the form is submitted with the input value', () => {
    const onSearch = jest.fn();

    onSearch('Initial Query');

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('Initial Query');
  });

  // https://testing-library.com/docs/react-testing-library/cheatsheet

  // Another feature we need to test, is ensuring that
  // When the input value changes, that the onSearch is called with the new value
  // For this we will need to
  //
  // * render the component
  // * trigger a change
  // * submit the form
  // * verify that the callback was called with the correct value
  test('should call the provided onSearch with updated value if input has changed', () => {
    const onSearch = jest.fn();

    const { getByLabelText } = render(
      <SearchBar initialQuery="Initial Query" onSearch={onSearch} />
    );

    fireEvent.change(getByLabelText(/search:/i), {
      target: { value: 'New Search' },
    });
    fireEvent.submit(getByLabelText(/search:/i));

    expect(onSearch).toHaveBeenCalledWith('New Search');
  });

  // testing how it's used vs implementation details
  // I've introduced a bug into a class based version of SearchBarX
  test('should avoid testing implementation details 1', () => {
    const onSearch = jest.fn();

    const testRenderer = TestRenderer.create(
      <SearchBarX onSearch={onSearch} initialQuery="Initial Query" />
    );
    // if we change this to a functional component that uses hooks
    // instead of a class based one - there is no longer an an `instance` to return
    // note: update App.js to use the class based version of the SearchBar component
    // if we view in the browser - things are breaking, but the unit test is still passing

    testRenderer.getInstance().setQuery('New Search');
    testRenderer.getInstance().handleSubmit({ preventDefault: () => {} });

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('New Search');
  });

  // if we change this to a functional component that uses hooks
  // instead of a class based one - there is no longer an an `instance` to return
  // note: update App.js to use the class based version of the SearchBar component
  // if we view in the browser - things are breaking, but the unit test is still passing

  test.skip('should avoid testing implementation details 2', () => {
    const div = document.createElement('div');
    const onSearch = jest.fn();

    ReactDOM.render(
      <SearchBarX onSearch={onSearch} initialQuery="Initial Query" />,
      div
    );

    let input = div.querySelector('input');

    TestUtils.Simulate.change(input, { target: { value: 'New Search' } });
    TestUtils.Simulate.submit(input, {});

    // testRenderer.getInstance().setQuery('New Search');
    // testRenderer.getInstance().handleSubmit({ preventDefault: () => {} });

    expect(onSearch).toHaveBeenCalledWith('New Search');
  });

  it('should display warning if the search field is blank', () => {
    const onSearch = jest.fn();

    const { getByLabelText } = render(
      <SearchBar initialQuery="Initial Query" onSearch={onSearch} />
    );

    fireEvent.change(getByLabelText(/search:/i), {
      target: { value: '' },
    });
    fireEvent.submit(getByLabelText(/search:/i));

    // this is an ok start, but it only tells us that it has been called
    // knowing what has been passed in is more important
    // what if there is an error in our code that isn't getting the correct field value?

    expect(getByLabelText('search-term-required')).toHaveTextContent(
      'Please enter search field'
    );
    expect(onSearch).not.toBeCalled();
  });

  // if a user only enters spaces, we want to treat that as a empty
  // and not allow them to submit the search
  // Step 1. Write a test that sets the value to an empty string of spaces & submits it
  // Verify that the test is failing
  // Step 2. Fix the handleSubmit to account for empty strings, and get the test passing

  it('should display warning if the user enters spaces and no value', () => {
    // what if a user enters a string of just spaces
    // create a test for the failing condition
    // then fix it
    const onSearch = jest.fn();
    expect(1).toBe(1);
  });
});
