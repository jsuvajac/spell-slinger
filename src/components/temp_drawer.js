import React from "react";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from "@material-ui/icons/Menu";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import FormDialog from "./spell_book_form";
import MenuListComposition from "./menu";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleRouteClick = (route) => {
    history.push(route);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    // event.preventDefault();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state.anchor, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <div className="App-navigation">
        {/* Spell Book nav */}
        <Typography
          variant="h5"
          component="h5"
          style={{ margin: 5 }} // space to "Version" text
        >
          Spell Books
        </Typography>

        {/* Add Spell book */}
        <FormDialog addSpellBook={props.addSpellBook} />

      </div>
      <Divider />
      <List>
        {props.spellBooks.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              handleRouteClick("/" + text);
            }}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>

        ))}

      </List>

      {/* Remove Spell book */}
      <MenuListComposition
        add_icon={false}
        spellBookNames={props.spellBookNames}
        addToSpellBook={props.removeFromSpellBook}
      />

    </div>
  );

  return (
    <div style={{ position: "absolute" }}>
      {
        ["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(anchor, true)}
              style={{ marginLeft: 3 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))
      }
    </div>
  );
}
