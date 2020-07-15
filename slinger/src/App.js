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

// function returns an array of 4 digit hex strings representing each spell
function buf2hex24(buffer) {
  // buffer is an Uint16Array buffer

  //console.log(new Uint16Array(buffer));
  let hex = Array.prototype.map.call(new Uint16Array(buffer), (x) => {
    return x.toString(16).padStart(4, "0");
  });
  console.log("hex: ", hex);
  // join into a string
  let str = hex.join("");
  // 0 padding
  while (str.length % 4 !== 0) {
    str += "0";
  }
  // split in groups of 16
  hex = str.match(/.{1,4}/g);

  return hex;
}

// encode a spell book into a unicode string
function encodeSpellBook(book) {
  book = Array.from(book);
  let buff = new Uint16Array(book).buffer;
  console.log("buf: ", buff);
  let buf16 = buf2hex24(buff);
  console.log("16: ", buf16);
  let unicode = buf16.map((item) => String.fromCharCode("0x" + item));
  //console.log("to string: ", unicode);
  return unicode.join("");
}

// decode the unicode spell containing a spell book
function decodeSpellBook(str) {
  // encoded str to char string arr
  let arr = str.split("").map((_, index) => {
    return str.charCodeAt(index).toString(16).padStart(3, "0");
  });
  // remove padding
  if (arr[arr.length - 1].length !== 3) {
    arr.pop();
  }
  //convert to int
  arr = arr.map((num) => parseInt(num, 16));
  //console.log(arr);
  return arr;
}

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

      //spellBooks: { test: new Set([...Array(412).keys()]) }, // set of indices
      //spellBookNames: ["test"], // list of names of spell books
    };
  }

  // reload home page
  goHome = () => {
    const { history } = this.props;
    history.push("/");
  };

  // saving the state of spell books to local storage after each update
  // TODO: Find a way of of calling this after the new state gets updated
  //       or kludge the new spell in with the previous state
  // the main issue is that an empty spell book will not be saved and
  // the last added spell will be missing
  saveToLocalStorage = (book) => {
    console.log("saving: ", book);
    if (this.state.spellBooks[book].size !== 0) {
      //console.log("state : ", this.state.spellBooks[book]);
      //console.log("state length: ", this.state.spellBooks[book].length);
      let enc = encodeSpellBook(this.state.spellBooks[book]);
      localStorage.setItem(book, enc);
      //console.log(book, " saved");
    }
  };

  // TODO: Refactor the spell book api
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

  /* 
   insert a spell into a spell book
   currently if the book does not exist it will be created
  */
  updateSpellBook(spell, book) {
    if (book in this.state.spellBooks) {
      // add to existing spell-book
      console.log("exisiting book", book);
      this.setState((prevState) => ({
        spellBooks: {
          ...prevState.spellBooks,
          [book]: this.state.spellBooks[book].add(spell.index),
        },
      }));
    } else {
      // new spell-book
      console.warn("new spell book triggered through update");
      this.setState((prevState) => ({
        spellBooks: {
          ...prevState.spellBooks,
          [book]: new Set([spell.index]),
        },
        spellBookNames: this.state.spellBookNames.concat([book]),
      }));
    }
    if (this.state.spellBooks[book].length !== 0){
      console.log(this.state.spellBooks[book]);
      this.saveToLocalStorage(book);
    }

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
        if (spell.name.toLowerCase().match(new RegExp(name.toLowerCase()))) {
          spell.render = true;
        } else {
          spell.render = false;
        }
        return spell;
      }),
    });
  }

  componentDidMount() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let dec = decodeSpellBook(localStorage.getItem(key));
      console.log(`${key}: ${localStorage.getItem(key)}`);
      console.log(`${dec}`);
        this.setState((prevState) => ({
          spellBooks: {
            ...prevState.spellBooks,
            [key]: new Set(dec),
          },
          spellBookNames: this.state.spellBookNames.concat([key]),
        }));
    }
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
          // TODO: alter the tabs for prepped spells
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
                  //console.log(name, index);
                  //console.log(this.state.spellBooks);
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
                          spellBookNames={this.state.spellBookNames}
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
                  spellBookNames={this.state.spellBookNames}
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
