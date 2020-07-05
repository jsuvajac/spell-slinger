import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    width: 1 / 2,
    height: 1 / 2,
  },
  card_field: {
  },
  card_text: {
    marginBottom: 12,
    marginTop: 12,
  }
};


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
    // Back - spell text
    if (this.state.flip_back) {
      return (
        <Card className={this.props.root}>
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
                    className={this.props.card_text}
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
        <Card className={this.props.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.props.spell['Name']}
            </Typography>

            {
              this.displayKeyVal(
                'Level: ',
                this.props.spell['Level'],
                this.props
              )}
            {
              this.displayKeyVal(
                'Range: ',
                this.props.spell['Range'],
                this.props
              )}
            {
              this.displayKeyVal(
                'Components: ',
                this.props.spell['Components'],
                this.props
              )}
            {
              this.displayKeyVal(
                'Duration: ',
                this.props.spell['Duration'],
                this.props
              )}
            {/*
              this.displayKeyVal(
                'Source: ',
                this.props.spell['Page'],
                this.props
              )*/
            }
            {
              this.displayKeyVal(
                'Class: (',
                this.props.spell['Class'],
                this.props,
                ")   "
              )}
            {
              this.displayKeyVal(
                'Casting time: ',
                this.props.spell['Casting time'],
                this.props
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

export default withStyles(styles)(SpellCard);