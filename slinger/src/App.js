import React from 'react';
import SpellList from './components/spell_cards';
import SpellForm from './components/spell_form';

import './App.css';

import Typography from '@material-ui/core/Typography';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Typography variant="h2" component="h2">
          Spell Slinger
        </Typography>
      </header>

      <SpellForm />
      <div className="App-spells">
        <SpellList />
      </div>
    </div>
  );
}

export default App;
