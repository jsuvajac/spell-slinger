import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// Spell cards
import SpellList from "./components/spell_list";
import SpellForm from "./components/spell_form";
import SpellsData from "./data/spells.json";
// import FilterData from "./data/filters.json";

// Spell Books
import TemporaryDrawer from "./components/temp_drawer";
import { saveToLocalStorage, decodeSpellBook } from "./util/spell_book_storage";

//import TabPannel from "./components/tab";
import FormDialog from "./components/spell_book_form";
import FilterForm from "./components/filter_form";

import MenuListComposition from "./components/menu";

import "./App.css";


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

      // TODO: 
      // create a permanent non mutable spellBook for storing spell collections
    };
  }

  // reload home page
  goHome = () => {
    const { history } = this.props;
    history.push("/");
  };

  // Create a new empty spell book
  createSpellBook(book) {
    if (!this.state.spellBookNames.includes(book)) {
      this.setState((prevState) => ({
        spellBooks: {
          ...prevState.spellBooks,
          [book]: new Set([]),
        },
        spellBookNames: this.state.spellBookNames.concat([book]),
      }));
    }
  }

  // Remove a spell book
  removeSpellBook(book) {
    // console.log("removing: ", book, this.state.spellBooks);
    const { [book]: value, ...updatedSpellBooks } = this.state.spellBooks;

    this.setState({
      spellBooks: updatedSpellBooks,
      spellBookNames: Object.keys(updatedSpellBooks),
    });

    localStorage.removeItem(book);
  }

  // insert a spell into a spell book
  addSpell(spell, book) {
    const { ...updatedSpellBooks } = this.state.spellBooks;

    updatedSpellBooks[book].add(spell.index);

    this.setState({
      spellBooks: updatedSpellBooks,
    });

    saveToLocalStorage(book, updatedSpellBooks[book]);
  }

  // remove a spell from a spell book
  removeSpell(spell, book) {
    const { ...updatedSpellBooks } = this.state.spellBooks;

    updatedSpellBooks[book].delete(spell.index);

    this.setState({
      spellBooks: updatedSpellBooks,
    });
    saveToLocalStorage(book, updatedSpellBooks[book]);

    console.info(this.state.spellBooks);
  }

  /* 
   sets spell.render to true if the spell name constins the name as a substring
   the matching is NOT case sensitive

   This toggiling solution was much faster than creating a new array of objects
   through map and filter
  */
  updateSpellList(name) {
    this.setState({
      spells: this.state.spells.map((spell) => {
        if (spell.name.toLowerCase().match(new RegExp(name.toLowerCase()))) {
          spell.render = true;
        } else {
          spell.render = false;
        }
        return spell;
      }),
    });
  }

  // Read state form local storage
  componentDidMount() {
    let spellBooks = {};

    for (let i = 0; i < localStorage.length; i++) {
      let bookName = localStorage.key(i);
      let book = decodeSpellBook(localStorage.getItem(bookName));
      console.log(`${bookName}: ${book}`);
      spellBooks[bookName] = new Set(book);
    }
    this.setState({
      spellBooks: spellBooks,
      spellBookNames: Object.keys(spellBooks),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Typography
            variant="h4"
            component="h3"
            onClick={ this.goHome }
          >
            Spell Slinger
          </Typography>
        </header>

        {
          // TODO: alter the tabs for prepped spells
          // <TabPannel/>
        }
        <div>
          <div className="App-navigation">

          {/* Search bar */}
          <SpellForm updateSpell={this.updateSpellList.bind(this)} />
          {/* Spell Book nav */}
          <TemporaryDrawer spellBooks={this.state.spellBookNames} />
          {/* Add Spell book */}
          <FormDialog addSpellBook={this.createSpellBook.bind(this)} />
          {/* Remove Spell book */}
          <MenuListComposition
            add_icon={false}
            spellBookNames={this.state.spellBookNames}
            addToSpellBook={this.removeSpellBook.bind(this)}
          />
          </div>
          {/* TODO: add a drawer button to expand  */}
          <div className="App-navigation">
            <FilterForm updateSpell={this.updateSpellList.bind(this)} />
          </div>
        </div>

        <div className="App-spells">
          <br />
          <Switch>
            {/* Dynamically create routes for each spell book */}
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
                          updateSpellBook={this.removeSpell.bind(this)}
                          spellBookNames={this.state.spellBookNames}
                          to_add={false}
                          spellBook={name}
                          {...props}
                        />
                      )}
                    />
                  );
                })
              : null}
            {/* Main search route - contains all spells */}
            <Route
              exact
              path="/"
              render={(props) => (
                <SpellList
                  spells={this.state.spells}
                  updateSpellBook={this.addSpell.bind(this)}
                  spellBookNames={this.state.spellBookNames}
                  to_add={true}
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
