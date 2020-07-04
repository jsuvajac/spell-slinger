import React from 'react';

import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import SpellCard from '../components/spell_card';


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
          this.props.spells.map((spell, index) => {
            return (
              <Grid item key={index} >
                <SpellCard spell={spell}/>
              </Grid>
              );
            })
        }
        </Grid>
    );
  }

}


export default  withStyles(styles)(SpellList);