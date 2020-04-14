import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { act, fireEvent, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import SearchBar from './SearchBar';
import SearchBarX from './SearchBarCls';
describe('Search Bar Functionality', () => {
  test('should set the search input field to the provided initialQuery', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBar initialQuery="Initial Query" />, div);
    expect(div.querySelector('input').value).toBe('Initial Query');
  });

  test('should call the provided onSearch callback when the form is submitted with the input value', () => {
    const onSearch = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(
      <SearchBar initialQuery="Initial Query" onSearch={onSearch} />,
      div
    );
    const form = div.querySelector('form');

    fireEvent.submit(form, { preventDefault: () => {} });
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
    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('New Search');
  });
  // testing how it's used vs implementation details
  test.skip('should avoid testing implementation details 1', () => {
    const onSearch = jest.fn();
    let root;
    root = TestRenderer.create(
      <SearchBar onSearch={onSearch} initialQuery="Initial Query" />
    );
    // if we change this to a functional component that uses hooks
    // instead of a class based one - there is no longer an an `instance` to return
    root.getInstance().setQuery('New Search');
    root.getInstance().handleSubmit({ preventDefault: () => {} });

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('New Search');
  });
});
