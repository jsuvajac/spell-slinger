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
    maxWidth: 500,
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

  displayKeyVal(key, val, props, key2 = null) {
    return key2 === null ? (
      <div style={{ display: "flex" }}>
        <Typography className={props.card_field} color="textPrimary" >
          {key}
        </Typography>

        <Typography className={props.card_text} color="textSecondary">
          {val}
        </Typography>
      </div>

    ) : (
        <div style={{ display: "flex" }}>
          <Typography className={props.card_field} color="textPrimary" >
            {key}
          </Typography>

          <Typography className={props.card_text} color="textSecondary">
            {val}
          </Typography>
          <Typography className={props.card_field} color="textPrimary" >
            {key2}
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
                this.props.spell['Level'],
                classes
              )}
            {
              this.displayKeyVal(
                'Range: ',
                this.props.spell['Range'],
                classes
              )}
            {
              this.displayKeyVal(
                'Components: ',
                this.props.spell['Components'],
                classes
              )}
            {
              this.displayKeyVal(
                'Duration: ',
                this.props.spell['Duration'],
                classes
              )}
            {/*
              this.displayKeyVal(
                'Source: ',
                this.props.spell['Page'],
                classes
              )*/
            }
            {
              this.displayKeyVal(
                'Class: (',
                this.props.spell['Class'],
                classes,
                ")   "
              )}
            {
              this.displayKeyVal(
                'Casting time: ',
                this.props.spell['Casting time'],
                classes
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