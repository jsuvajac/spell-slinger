import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// Spell cards
import SpellList from "./components/spell_list";
import SpellForm from "./components/spell_form";
import SpellsData from "./data/spells.json";

// Spell Books
import TemporaryDrawer from "./components/temp_drawer";
//import TabPannel from "./components/tab";
import FormDialog from "./components/spell_book_form";

import "./App.css";

function encodeSpellBook(book) {
  let buff = new Uint16Array(book);
  buff.forEach((item) => {
    console.log(item);
  });
  return buff;
}

/*
function decodeSpellBook(buff) {
  console.log(buff);
  buff.buffer.map((item) => {
    return item;
  });
  console.log(buff);
  return buff;
}
*/

class SpellApp extends React.Component {
  constructor(props) {
    super(props);

    let data = SpellsData.map((spell, index) => {
      spell.render = true; // flag used for filtering through search
      spell.index = index; // indices added for easier spell book storage
      return spell;
    });

    this.state = {
      spells: data, // List of JSON objecst spells
      spellBooks: {}, // set of indices
      spellBookNames: [], // list of names of spell books
    };
  }

  // reload home page
  goHome = () => {
    const { history } = this.props;
    history.push("/");
  };

  // Create a new empty spell book
  createSpellBook(book) {
    this.setState({
      spellBooks: {
        [book]: new Set(),
      },
      spellBookNames: this.state.spellBookNames.concat([book]),
    });
  }

  /* 
   insert a spell into a spell book
   currently if the book does not exist it will be created
  */
  updateSpellBook(spell, book) {
    if (book in this.state.spellBooks) {
      // add to existing spell-book
      this.setState({
        spellBooks: {
          [book]: this.state.spellBooks[book].add(spell.index),
        },
      });
    } else {
      // new spell-book
      this.setState({
        spellBooks: {
          [book]: new Set([spell.index]),
        },
        spellBookNames: this.state.spellBookNames.concat([book]),
      });
    }
    let enc = encodeSpellBook(this.state.spellBooks[book]);
    console.log(enc);
    //let dec = (decodeSpellBook(enc));
    //console.log(dec);
    console.info(this.state.spellBooks);
  }

  /* 
   setts spell.render to true if the spell name constins the name as a substring
   the matching is NOT case sensitive

   This toggiling solution was much faster than creating a new array of objects
   through map and filter
  */
  updateSpellList(name) {
    this.setState({
      spells: this.state.spells.map((spell) => {
        if (spell.Name.toLowerCase().match(new RegExp(name.toLowerCase()))) {
          spell.render = true;
        } else {
          spell.render = false;
        }
        return spell;
      }),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Typography
            variant="h4"
            component="h3"
            onClick={() => {
              console.log("reset");
              this.goHome();
            }}
          >
            Spell Slinger
          </Typography>
        </header>

        {
          // NOTE: alternate option for displaying spell books
          //<TabPannel/>
        }
        <div className="App-navigation">
          <SpellForm updateSpell={this.updateSpellList.bind(this)} />
          <TemporaryDrawer spellBooks={this.state.spellBookNames} />
          <FormDialog addSpellBook={this.createSpellBook.bind(this)} />
        </div>

        <div className="App-spells">
          <br />
          <Switch>
            {/* Dynamically create routes for each spell book*/}
            {this.state.spellBookNames.length > 0
              ? this.state.spellBookNames.map((name, index) => {
                  return (
                    <Route
                      key={index}
                      path={`/${name}`}
                      render={(props) => (
                        <SpellList
                          spells={Array.from(this.state.spellBooks[name])
                            .map((index) => this.state.spells[index])
                            .copyWithin()}
                          updateSpellBook={this.updateSpellBook.bind(this)}
                          {...props}
                        />
                      )}
                    />
                  );
                })
              : null}
            {/* Main search route */}
            <Route
              exact
              path="/"
              render={(props) => (
                <SpellList
                  spells={this.state.spells}
                  updateSpellBook={this.updateSpellBook.bind(this)}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(SpellApp);
