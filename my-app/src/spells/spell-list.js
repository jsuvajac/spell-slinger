import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import SpellsData from '../data/spells.json';

const useStyles = makeStyles({
  root: {
  },
  card: {
    background: 'lightgray',
    boxShadow: 'darkgray',
    height: 300,
    width: 300,
    padding: '0 30px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SpellList() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  return (

    <div>

      <Typography variant="h5" component="h2">
        All Spells
      </Typography>


      {
        SpellsData.map((spell, index) => {
          return <div className={classes.root}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>

                <Typography variant="h5" component="h2">
                  {spell['Name']}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  <p>{'Level: ' + spell['Level']}</p>
                  <p>{'Range: ' + spell['Range']}</p>
                  <p>{'Components: ' + spell['Components']}</p>
                  <p>{'Duration: ' + spell['Duration']}</p>
                  <p>{'Source: ' + spell['Page']}</p>
                  <p>{'Classes: (' + spell['Class'].slice(-1) + ')'}</p>
                  <p>{'Casting time:' + spell['Casting time']}</p>
                </Typography>

                <Typography variant="body2" component="p">
                  <p>{spell['Text']}</p>
                </Typography>

              </CardContent>

              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>

            <br />
          </div>
        })
      }
    </div>
  );
}


