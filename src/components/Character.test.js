import React from 'react';
import { render } from '@testing-library/react';
import Character from './Character.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

test('Renders a correct Character', () => {
  const testCharacter = {
    id: "2",
    name: "Test Character",
    image: "https://via.placeholder.com/150",
    episode: []
  };
  const { getByText, getByAltText } = render(<Router><Character character={testCharacter}/></Router>);

  const nameEl = getByText(/Test Character/);
  const imageEL = getByAltText(/Test Character/);
  const episodeCount = getByText(/Appeared in 0 episodes/);

  expect(nameEl).toBeInTheDocument();
  expect(episodeCount).toBeInTheDocument();
  expect(imageEL).toBeInTheDocument();
});
