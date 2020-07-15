import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
//import CardHeader from '@material-ui/core/CardHeader';

import CardActions from "@material-ui/core/CardActions";
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from "@material-ui/core/CardContent";

import IconButton from "@material-ui/core/IconButton";
//import AddIcon from "@material-ui/icons/Add";
//import RemoveIcon from "@material-ui/icons/Remove";
import FlipIcon from "@material-ui/icons/Flip";

import { withStyles } from "@material-ui/core";

import MenuListComposition from "./menu";

const styles = (theme) => ({
  root: {
    height: "100%",
    width: "100%",
    color: "purple",
  },
  card_content: {},
  card_text: {
    color: "textPrimary",
  },
});

class SpellCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flip_back: false,
      to_add: true,
    };
    if (props.to_add) {
      this.setState({ to_add: props.to_add });
    }
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
          // back
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
                "Materials: ",
                this.props.spell["material_desc"]
              )
            : null}
          {this.displayKeyVal("Duration: ", this.props.spell["duration"])}

          {this.state.flip_back
            ? this.displayKeyVal(
                "Source: ",
                this.props.spell["source"] + " pg " + this.props.spell["page"]
              )
            : null}
          {this.displayKeyVal("Class: (", this.props.spell["class_desc"], ")")}
          {this.displayKeyVal(
            "Casting time: ",
            this.props.spell["casting_time"]
          )}

          {this.props.spell["ritual"] ? this.displayKeyVal("Ritual", "") : null}
          {this.props.spell["concentration"]
            ? this.displayKeyVal("Concentration", "")
            : null}
        </CardContent>

        <CardActions>

          <IconButton
            onClick={() => {
              this.setState({ flip_back: !this.state.flip_back });
            }}
          >
            <FlipIcon />
          </IconButton>
          {/*this.state.to_add ? <AddIcon /> : <RemoveIcon />*/}
          <MenuListComposition
            spellBookNames={this.props.spellBookNames}
            addToSpellBook={(spellBook) => {
              this.props.updateSpellBook(this.props.spell, spellBook);
            }}
          />
        </CardActions>
      </Card>
    );
  }
}

SpellCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpellCard);
