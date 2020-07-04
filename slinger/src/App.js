import React from 'react';
import SpellList from './components/spell_list';
import SpellForm from './components/spell_form';

import './App.css';

import Typography from '@material-ui/core/Typography';

class SpellApp extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Typography variant="h2" component="h2">
            Spell Slinger
          </Typography>
        </header>

        <SpellForm />

        <div className="App-spells">
          <br/>
          <br/>
          <SpellList />
        </div>
      </div>
    );
  }
}

export default SpellApp;
