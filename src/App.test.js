import React from 'react';
import App from './App';
import { act, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');
describe.skip('some tests', () => {
  test('something special', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        hits: [
          {
            title: 'Test',
            url: 'https://www.evanjustevan.com',
            objectID: '123456',
          },
        ],
      },
    });
    const promise = Promise.resolve();
    const r = render(<App />);
    r.debug();
    await act(() => promise);
    r.debug();
  });
});
