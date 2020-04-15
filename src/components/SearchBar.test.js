import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { act, fireEvent, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import SearchBar from './SearchBar';
import SearchBarX from './SearchBarCls';

describe('Search Bar Functionality', () => {
  test('should set the search input field to the provided initialQuery', () => {
    // For component unit tests - we will need to render the component,
    // we can do this using React.render and attaching it to a div element
    const div = document.createElement('div');
    ReactDOM.render(<SearchBar initialQuery="Initial Query" />, div);
    expect(div.querySelector('[data-test-id=search-query]').value).toBe(
      'Initial Query'
    );
  });

  // ReactDOM.render will return a HTML element/document fragment - and we
  // can use query selectors to query the dom and validate the values
  // however, using react-testing-library - some of the boilerplate
  // can be simplified, and also get extra functionality

  test.skip('should set the search input field to the provided initialQuery - react testing lib', () => {
    // using react-testing-lib, we get a few helpers to help reduce the boilerplate, and also
    // a number of queries to make it easy to access the dom, and give us more useful
    // error messages
    const { getByTestId } = render(<SearchBar initialQuery="Initial Query" />);
    // on the first run, this should fail - we used the wrong
    // attribute for the data-test-id
    // if we fix that, we can see our previous test failing, and compare the output to what we see here
    expect(getByTestId('search-query').value).toBe('Initial Query');
    // change data-test-id="search-query" to data-testid="search-query"
  });

  test('should call the provided onSearch callback when the form is submitted with the input value', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBar initialQuery="Initial Query" onSearch={onSearch} />
    );

    fireEvent.submit(getByTestId('search-form'), { preventDefault: () => {} });
    // this is an ok start, but it only tells us that it has been called
    // knowing what has been passed in is more important
    // what if there is an error in our code that isn't getting the correct field value?
    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('Initial Query');
  });

  test('should call the provided onSearch with updated value if input has changed', () => {
    // https://testing-library.com/docs/react-testing-library/cheatsheet
    const onSearch = jest.fn();

    const element = render(
      <SearchBar initialQuery="Initial Query" onSearch={onSearch} />
    );

    fireEvent.change(element.getByLabelText(/search:/i), {
      target: { value: 'New Search' },
    });
    fireEvent.submit(element.getByLabelText(/search:/i));

    // this is an ok start, but it only tells us that it has been called
    // knowing what has been passed in is more important
    // what if there is an error in our code that isn't getting the correct field value?
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

  test.skip('should avoid testing implementation details 2', () => {
    const div = document.createElement('div');
    const onSearch = jest.fn();

    ReactDOM.render(
      <SearchBarX onSearch={onSearch} initialQuery="Initial Query" />,
      div
    );
    // if we change this to a functional component that uses hooks
    // instead of a class based one - there is no longer an an `instance` to return
    // note: update App.js to use the class based version of the SearchBar component
    // if we view in the browser - things are breaking, but the unit test is still passing

    let input = div.querySelector('input');

    TestUtils.Simulate.change(input, { target: { value: 'New Search' } });
    TestUtils.Simulate.submit(input, {});
    //// testRenderer.getInstance().setQuery('New Search');
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

  it('should display warning if the user enters spaces and no value', () => {
    // what if a user enters a string of just spaces
    // create a test for the failing condition
    // then fix it
    const onSearch = jest.fn();

    const { getByLabelText } = render(
      <SearchBar initialQuery="Initial Query" onSearch={onSearch} />
    );

    fireEvent.change(getByLabelText(/search:/i), {
      target: { value: ' ' },
    });
    fireEvent.submit(getByLabelText(/search:/i));

    expect(getByLabelText('search-term-required')).toHaveTextContent(
      'Please enter search field'
    );
    expect(onSearch).not.toBeCalled();
  });
});
