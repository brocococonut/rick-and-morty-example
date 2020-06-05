// Styles
import 'mini.css/dist/mini-default.css';
import './App.css';

// Module imports
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Route/component imports
import Characters from './routes/Characters.jsx';
import CharacterProfile from './routes/CharacterProfile.jsx';
import Header from './components/Header.jsx';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/character/:id">
              <CharacterProfile />
            </Route>
            <Route path="/">
              <Characters />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
