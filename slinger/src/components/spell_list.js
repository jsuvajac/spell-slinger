import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import SpellCard from '../components/spell_card';


const styles = theme => ({
  root: {
    width: "100%",
    margin: 0,
    padding: 0,
  },
  item: {
    margin: 10,
    padding: 1
  }
});


class SpellList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="row"
        justify="center"
        alignItems="center"
      >


        {
          this.props.spells.map((spell, index) => {
            return (
              spell.render ?
                <Grid item key={index} className={classes.item} xs={7} md={5} lg={3} xl={2}>
                  <SpellCard spell={spell} />
                </Grid>
                : null
            );
          })
        }
      </Grid>
    );
  }

}

SpellList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpellList);