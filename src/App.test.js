import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders "Home" navigation link', () => {
  const { getByText } = render(<App />);
  const homeNavEl = getByText(/Home/i);
  expect(homeNavEl).toBeInTheDocument();
});
