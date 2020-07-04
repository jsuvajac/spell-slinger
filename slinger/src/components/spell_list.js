import React from 'react';

import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import SpellCard from '../components/spell_card';
import SpellsData from '../data/spells.json';


const styles = {
  root: {
    flexGrow: 1
  }
};


class SpellList extends React.Component {
  render() {
    return (
      <Grid
        container
        className={this.props.root}
        spacing={5}
        direction="row"
        justify="center"
        alignItems="center"
      >

        {
          SpellsData.slice(0, 5).map((spell, index) => {
            return (

              <Grid item>
                <SpellCard spell={spell} key={index} />
              </Grid>
              );
            })
        }
        </Grid>
    );
  }

}


export default  withStyles(styles)(SpellList);