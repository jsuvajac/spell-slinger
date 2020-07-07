import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SpellCard from '../components/spell_card';


const styles = theme => ({
  root: {
    margin: 0,
    padding: 0,
  },
  item: {
    margin: "16px",
    padding: "2px",
    minWidth: 350,
    minHeight: 300,
  },
});

const theme = createMuiTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, sm: 568, md: 1080, lg: 1400, xl: 1920}
  }
});

class SpellList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>

        <Grid
          container
          className={classes.root}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >


          {
            this.props.spells.map((spell, index) => {
              return (
                spell.render ?
                  <Grid
                    item
                    key={index}
                    className={classes.item}
                    xs={11}
                    sm={5}
                    md={3}
                    lg={2}
                    xl={1}
                  >
                    <SpellCard spell={spell} />
                  </Grid>
                  : null
              );
            })
          }
        </Grid>
      </MuiThemeProvider>
    );
  }

}

SpellList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpellList);