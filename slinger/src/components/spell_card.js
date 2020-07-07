import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: "100%",
    width: "100%",
  },
  card_content: {
  },
  card_text: {
  }
});


class SpellCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flip_back: false };
  }

  displayKeyVal(key, val, key2 = null) {
    const { classes } = this.props;
    return (
        <div style={{ display: "flex" }}>
          <Typography className={classes.card_field} color="textPrimary" >
            {key}

            <Typography className={classes.card_text} color="textSecondary" component="span">
              {val}
            </Typography>
            {key2 === null ? null : key2}
          </Typography>
        </div>

      );
  }
  render() {
    const { classes } = this.props;
    // Back - spell text
    if (this.state.flip_back) {
      return (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.props.spell['Name']}
            </Typography>

            {
              this.props.spell['Text'].map((line, index) => {
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
            }
          </CardContent>

          <CardActions>
            <Button
              size="small"
              onClick={() => {
                this.setState({ flip_back: !this.state.flip_back })
              }}
            >
              Flip
            </Button>
          </CardActions>

        </Card>
      )
    } else {
      // front: spell stats
      return (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.props.spell['Name']}
            </Typography>

            {
              this.displayKeyVal(
                'Level: ',
                this.props.spell['Level']
              )}
            {
              this.displayKeyVal(
                'Range: ',
                this.props.spell['Range']
              )}
            {
              this.displayKeyVal(
                'Components: ',
                this.props.spell['Components']
              )}
            {
              this.displayKeyVal(
                'Duration: ',
                this.props.spell['Duration']
              )}
            {/*
              this.displayKeyVal(
                'Source: ',
                this.props.spell['Page']
              )*/
            }
            {
              this.displayKeyVal(
                'Class: (',
                this.props.spell['Class'].join(", "),
                ")   "
              )}
            {
              this.displayKeyVal(
                'Casting time: ',
                this.props.spell['Casting time']
              )}


          </CardContent>

          <CardActions>
            <Button
              size="small"
              onClick={() => {
                this.setState({ flip_back: !this.state.flip_back })
              }}
            >
              Flip
            </Button>
          </CardActions>

        </Card>
      );

    }
  }
}

SpellCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpellCard);