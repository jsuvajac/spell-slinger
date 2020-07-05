import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from "formik"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '25ch',
  },
};


class SpellForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spell: "" };
  }

  render() {
    return (

        <Formik
          initialValues={{ spell: "test" }}
          onSubmit={data => {
            console.log(data);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form
             align="center"
             onSubmit={handleSubmit}
             onChange={handleChange}
             className={this.props.root}
             >
               
              <TextField
                name="spell"
                onChange={data => {
                  this.setState({ spell: data.currentTarget.value })
                  this.props.updateSpell(data.currentTarget.value)
                  //console.log(this.state);
                }}
                onBlur={handleBlur}
              />
              <Button type="submit">submit</Button>
            </form>
          )}
        </Formik>
    );
  }
}

SpellForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SpellForm);