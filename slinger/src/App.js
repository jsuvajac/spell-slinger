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

import MenuListComposition from "./components/menu";

import "./App.css";

// function returns an array of 4 digit hex strings representing each spell
function buf2hex24(buffer) {
  // buffer is an Uint16Array buffer

  //console.log(new Uint16Array(buffer));
  let hex = Array.prototype.map.call(new Uint16Array(buffer), (x) => {
    return x.toString(16).padStart(4, "0");
  });
  // console.log("hex: ", hex);
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
  // console.log("buf: ", buff);
  let buf16 = buf2hex24(buff);
  // onsole.log("16: ", buf16);
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
  // convert to int
  arr = arr.map((num) => parseInt(num, 16));
  // console.log(arr);
  return arr;
}

// saving the state of spell books to local storage after each update
const saveToLocalStorage = (bookName, spellBook) => {
  let enc = encodeSpellBook(spellBook);
  localStorage.setItem(bookName, enc);
  // console.log(bookName, " saved");
};

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

      // spellBooks: { test: new Set([...Array(412).keys()]) }, // set of indices
      // spellBookNames: ["test"], // list of names of spell books
    };
  }

  // reload home page
  goHome = () => {
    const { history } = this.props;
    history.push("/");
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

  // Remove a spell book
  removeSpellBook(book) {
    // console.log("removing: ", book, this.state.spellBooks);
    const { [book]: value, ...updatedSpellBooks } = this.state.spellBooks;
    // console.log("result: ", updatedSpellBooks);

    this.setState({
      spellBooks: updatedSpellBooks,
      spellBookNames: Object.keys(updatedSpellBooks),
    });
    // Update local storage
    localStorage.removeItem(book);
  }

  // insert a spell into a spell book
  updateSpellBook(spell, book) {
    const { ...updatedSpellBooks } = this.state.spellBooks;

    // add to existing spell-book
    // console.log("books", this.state.spellBooks);
    // console.log("book", this.state.spellBooks[book]);
    updatedSpellBooks[book].add(spell.index);
    // console.log("updated book", updatedSpellBooks);

    this.setState({
      spellBooks: updatedSpellBooks,
    });

    console.log(this.state.spellBooks[book]);
    saveToLocalStorage(book, updatedSpellBooks[book]);

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
          // <TabPannel/>
        }
        <div className="App-navigation">
          <SpellForm updateSpell={this.updateSpellList.bind(this)} />
          <TemporaryDrawer spellBooks={this.state.spellBookNames} />
          <FormDialog addSpellBook={this.createSpellBook.bind(this)} />
          <MenuListComposition
            add_icon={false}
            spellBookNames={this.state.spellBookNames}
            addToSpellBook={this.removeSpellBook.bind(this)}
          />
        </div>

        <div className="App-spells">
          <br />
          <Switch>
            {/* Dynamically create routes for each spell book*/}
            {this.state.spellBookNames.length > 0
              ? this.state.spellBookNames.map((name, index) => {
                  // console.log(name, index);
                  // console.log(this.state.spellBooks);
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
