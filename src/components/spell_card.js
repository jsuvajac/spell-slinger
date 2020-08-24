import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import clsx from 'clsx';
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import FlipIcon from '@material-ui/icons/KeyboardArrowDown';

import { withStyles } from "@material-ui/core";

import MenuListComposition from "./menu";

const styles = (theme) => ({
  root: {
    height: "100%",
    width: "100%",
    //color: "primary",
    //backgroundColor: "lightgreen",//theme.palette.primary.main,
    //color: theme.palette.primary.contrastText,
  },
  card_text: {
    //color: "textPrimary",
    //color: theme.palette.primary.text,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class SpellCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flip_back: false,
      to_add: props.to_add,
    };
  }

  displayKeyVal(key, val, key2 = null) {
    const { classes } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <Typography className={classes.card_field} color="textPrimary">
          {key}
          <Typography
            className={classes.card_text}
            color="textSecondary"
            component="span"
          >
            {val}
          </Typography>
          {key2 === null ? null : key2}
        </Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.spell["name"]}
          </Typography>

          {/*
          // back -- text and level scaling
          */}
          {this.state.flip_back ? (
            this.props.spell["higher_level"] ? (
              <React.Fragment>
                <Typography
                  color="textSecondary"
                  dangerouslySetInnerHTML={{ __html: this.props.spell["desc"] }}
                />
                <Typography color="textSecondary" component="p">
                  At higher levels:
                </Typography>
                <Typography
                  color="textSecondary"
                  dangerouslySetInnerHTML={{
                    __html: this.props.spell["higher_level"],
                  }}
                />
              </React.Fragment>
            ) : (
              <Typography
                color="textSecondary"
                dangerouslySetInnerHTML={{ __html: this.props.spell["desc"] }}
              />
            )
          ) : null}

          {/*
          // front
          */}
          {this.displayKeyVal("Level: ", this.props.spell["level_desc"])}
          {this.displayKeyVal("Range: ", this.props.spell["range"])}
          {this.displayKeyVal(
            "Components: ",
            this.props.spell["component_desc"]
          )}
          {this.props.spell["material_cost"]
            ? this.displayKeyVal(
                "Material cost: ",
                this.props.spell["material_desc"]
              )
            : this.props.spell["material"] 
            ? this.displayKeyVal(
                "Materials: ",
                this.props.spell["material_desc"]
              )
            : null}
          {this.displayKeyVal("Duration: ", this.props.spell["duration"])}
          {this.displayKeyVal("Class: (", this.props.spell["class_desc"], ")")}
          {this.displayKeyVal(
            "Casting time: ",
            this.props.spell["casting_time"]
          )}
          {this.state.flip_back
            ? this.displayKeyVal(
                "Source: ",
                this.props.spell["source"] + " pg " + this.props.spell["page"]
              )
            : null}
          {/*
          // Bool spell filters
          // TODO: replace with icons
          */}

          {this.props.spell["ritual"] ? this.displayKeyVal("Ritual", "") : null}
          {this.props.spell["concentration"]
            ? this.displayKeyVal("Concentration", "")
            : null}
          {this.props.spell["higher_level"]
            ? this.displayKeyVal("Scales at higher levels", "")
            : null}
        </CardContent>

        <CardActions disableSpacing>
          {/*
          // Add/remove form spell book
          */}
          {this.props.to_add ? (
            <MenuListComposition
              add_icon={this.props.to_add}
              spellBookNames={this.props.spellBookNames}
              addToSpellBook={(spellBook) => {
                this.props.updateSpellBook(this.props.spell, spellBook);
              }}
            />
          ) : (
            /* 
            TODO: add option to add with a button instead
                  for when there is only one spell book
                  or
                  create the menu with right click that picks a spell book (cached)
                  while left click adds to the chosen book
            */

            <IconButton aria-label="remove from spell book"
              onClick={() => {
                this.props.updateSpellBook(
                  this.props.spell,
                  this.props.spellBook
                );
              }}
            >
              <RemoveIcon />
            </IconButton>
          )}

          {/*
          // Toggle text blurb
          */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.flip_back,
            })}
            aria-label="show spell text"
            onClick={() => {
              this.setState({ flip_back: !this.state.flip_back });
            }}
          >
            <FlipIcon />
          </IconButton>


        </CardActions>
      </Card>
    );
  }
}

SpellCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpellCard);
