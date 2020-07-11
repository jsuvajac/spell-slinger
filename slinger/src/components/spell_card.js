import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
//import CardHeader from '@material-ui/core/CardHeader';

import CardActions from "@material-ui/core/CardActions";
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from "@material-ui/core/CardContent";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FlipIcon from "@material-ui/icons/Flip";

import { withStyles } from "@material-ui/core";



const styles = (theme) => ({
  root: {
    height: "100%",
    width: "100%",
    color: "purple",
  },
  card_content: {},
  card_text: {},
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
            {this.props.spell["Name"]}
          </Typography>
          {this.state.flip_back
            ? this.props.spell["Text"].map((line, index) => {
                return (
                  <Typography
                    paragraph
                    key={index}
                    className={classes.card_text}
                    color="textSecondary"
                  >
                    {line}
                  </Typography>
                );
              })
            : null}
          {/*
          // front and back: spell stats
          */}
          {this.displayKeyVal("Level: ", this.props.spell["Level"])}
          {this.displayKeyVal("Range: ", this.props.spell["Range"])}
          {this.displayKeyVal("Components: ", this.props.spell["Components"])}
          {this.displayKeyVal("Duration: ", this.props.spell["Duration"])}
          {/*this.displayKeyVal('Source: ', this.props.spell['Page'])*/}
          {this.displayKeyVal(
            "Class: (",
            this.props.spell["Class"].join(", "),
            ")"
          )}
          {this.displayKeyVal(
            "Casting time: ",
            this.props.spell["Casting time"]
          )}

        </CardContent>

        <CardActions>
          <IconButton
            onClick={() => {
              this.setState({ flip_back: !this.state.flip_back });
            }}
          >
            <FlipIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              this.props.updateSpellBook(
                this.props.spell,
                "testBook"
              );
              this.setState({
                num: this.state.num + 1,
              });
            }}
          >

            {this.state.to_add ? <AddIcon /> : <RemoveIcon />}
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
