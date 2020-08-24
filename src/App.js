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

      spellFilters: {
        name: "",
        class: "",
        level: "",
        concentration: false,
        ritual: false,
        higher: false,
      },
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
  updateSpellList(name, filter = null) {
    // reset spells
    let spells = this.state.spells.map((spell) => {
      spell.render = true;
      return spell;
    });

    let filter_state = this.state.spellFilters;
    // console.log("before state: ", filter_state);
    const before = spells.map((spell) => spell.render);

    // update name parameter in state
    if (name !== null) {
      filter_state.name = name;
    }
    // update filter parameters to state
    if (filter !== null) {
      let { name } = filter_state;

      filter_state = { ...filter };
      filter_state.name = name;

      if (filter_state.level === "cantrip") {
        filter_state.level = 0;
      }
    }
    console.debug("after state: ", filter_state);

    // Filtering:

    // Name filtering
    if (filter_state.name !== "") {
      spells.map((spell) => {
        if (
          spell.name
            .toLowerCase()
            .match(new RegExp(filter_state.name.toLowerCase()))
        ) {
          spell.render = true;
        } else {
          spell.render = false;
        }
        return spell;
      });
    }
    // Class filtering
    if (filter_state.class !== "") {
      spells.map((spell) => {
        if (spell.class.includes(filter_state.class)) {
          if (spell.render) {
            spell.render = true;
          }
        } else {
          spell.render = false;
        }
        return spell;
      });
    }
    // Level filtering
    if (filter_state.level !== "") {
      spells.map((spell) => {
        if (spell.level === filter_state.level) {
          if (spell.render) {
            spell.render = true;
          }
        } else {
          spell.render = false;
        }
        return spell;
      });
    }
    // Concentration filtering
    if (filter_state.concentration) {
      spells.map((spell) => {
        if (spell.concentration === filter_state.concentration) {
          if (spell.render) {
            spell.render = true;
          }
        } else {
          spell.render = false;
        }
        return spell;
      });
    }
    // Ritual filtering
    if (filter_state.ritual) {
      spells.map((spell) => {
        if (spell.ritual === filter_state.ritual) {
          if (spell.render) {
            spell.render = true;
          }
        } else {
          spell.render = false;
        }
        return spell;
      });
    }
    // Level Scaling filtering
    if (filter_state.higher) {
      spells.map((spell) => {
        if ("higher_level" in spell) {
          if (spell.render) {
            spell.render = true;
          }
        } else {
          spell.render = false;
        }
        return spell;
      });
    }
    // Material Cost filtering
    if (filter_state.material_cost) {
      spells.map((spell) => {
        if (spell.material_cost === filter_state.material_cost) {
          if (spell.render) {
            spell.render = true;
          }
        } else {
          spell.render = false;
        }
        return spell;
      });
    }

    // update state if changed
    const after = spells.map((spell) => spell.render);
    console.debug(
      "total post filter: ",
      after.filter((x) => x === true).length
    );

    if (before !== after) {
      this.setState({
        spells: spells,
        spellFilters: filter_state,
      });
    }
  }

  // Read state form local storage
  componentDidMount() {
    let spellBooks = {};

    for (let i = 0; i < localStorage.length; i++) {
      let bookName = localStorage.key(i);
      let book = decodeSpellBook(localStorage.getItem(bookName));
      console.debug(`${bookName}: ${book}`);
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
        <header className="App-header" style={{ display: "flex" }}>
          <Typography
            variant="h4"
            component="h3"
            onClick={this.goHome}
            style={{ margin: 5 }} // space to "Version" text
          >
            Spell Slinger
          </Typography>
          <Typography className="Version" componenet="span">
            Beta
          </Typography>
        </header>

        {
          // TODO: alter the tabs for different loadouts
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
