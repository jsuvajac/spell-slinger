import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SpellsData from '../data/spells.json';

const useStyles = makeStyles({
  root: {
  },
  card: {
    background: 'lightgray',
    boxShadow: 'darkgray',
    padding: '0 30px',
    maxWidth: 700,
    margin: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  card_text: {
    marginBottom: 12,
    justifyContent: 'left',
  }

});
function SpellCard(spell, classes) {
  return (

    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {spell['Name']}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          {'Level: ' + spell['Level']}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'Range: ' + spell['Range']}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'Components: ' + spell['Components']}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'Duration: ' + spell['Duration']}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'Source: ' + spell['Page']}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'Classes: (' + spell['Class'].slice(-1) + ')'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'Casting time:' + spell['Casting time']}
        </Typography>

      </CardContent>

      <CardActions>
        <Button size="small">Flip</Button>
      </CardActions>

    </Card>
  )
}
export default function SpellList() {
  const classes = useStyles();
  return (

    <div>
      {
        SpellsData.map((spell, index) => {
          return <div className={classes.root} key={index}>
            <br />
            {SpellCard(spell, classes)}
            <Typography variant="body2" component="p">
              {spell['Text']}
            </Typography>

          </div>
        })
      }

    </div>
  );
}


