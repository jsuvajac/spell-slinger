import React from 'react';
import Typography from '@material-ui/core/Typography';

import SpellList from './components/spell_list';
import SpellForm from './components/spell_form';
import SpellsData from './data/spells.json';

import './App.css';


class SpellApp extends React.Component {
  constructor(props) {
    super(props);
    let data = SpellsData.map((spell) => {
      spell.render = true;
      return spell;
    })

    this.state = {
      spells: data,
      spells_curr: data
    }
  }

  updateSpellList(name) {
    if (name.length >= 3) {
      this.setState({
        spells_curr:
          this.state.spells.map((spell) => {
            if (spell
              .Name
              .toLowerCase()
              .match(new RegExp(name.toLowerCase()))) {
              spell.render = true
            } else {
              spell.render = false
            }
            return spell;
          })
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Typography
            variant="h2"
            component="h2"
            onClick={() => {
              console.log("reset");
              this.setState({
                spells_curr:
                  this.state.spells_curr.map((spell) => {
                    spell.render = true;
                    return spell;
                  })
              })
            }}
          >
            Spell Slinger
          </Typography>
        </header>

        <SpellForm updateSpell={this.updateSpellList.bind(this)} />

        <div className="App-spells">
          <br />
          <SpellList spells={this.state.spells_curr} />
        </div>
      </div >
    );
  }
}

export default SpellApp;
