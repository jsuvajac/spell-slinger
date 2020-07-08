import React from 'react';
import Typography from '@material-ui/core/Typography';

import SpellList from './components/spell_list';
import SpellForm from './components/spell_form';
import SpellsData from './data/spells.json';

import './App.css';


class SpellApp extends React.Component {
  constructor(props) {
    super(props);
    let data = SpellsData.map((spell, index) => {
      spell.render = true;
      spell.index = index;
      return spell;
    })

    this.state = {
      spells: data,           // List of JSON objecst spells
      spellBooks: {},          // set of indices 
      spellBookNames: []
    }
  }

  updateSpellBook(spell, book) {
    if (book in this.state.spellBooks) {
      // add to existing spell-book
      this.setState({
        spellBooks: {
          [book]: this.state.spellBooks[book].add(spell.index)
        }
      });
    } else {
      // new spell-book
      this.setState({
        spellBooks: {
          [book]: new Set([spell.index])
        },
        spellBookNames:
            this.state.spellBookNames.concat([book])
      });
    }
    console.info(this.state.spellBooks);
  }

  updateSpellList(name) {
      this.setState({
        spells:
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
                spells:
                  this.state.spells.map((spell) => {
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
          {this.state.spellBookNames.length === 1?
          //console.log(Array.from(this.state.spellBooks[this.state.spellBookNames[0]]).map((index) => this.state.spells[index]))
          ///*
          <SpellList
            updateSpellBook={() => {console.log("dummy stub")}}
            spells={this.state.spellBookNames.length === 1?
              Array.from(this.state.spellBooks[this.state.spellBookNames[0]]).map((index) => this.state.spells[index]).copyWithin()
              :
              null
            }
           />
           //*/
           : null }
          <br />
          <SpellList spells={this.state.spells} updateSpellBook={this.updateSpellBook.bind(this)} />
        </div>
      </div >
    );
  }
}

export default SpellApp;
