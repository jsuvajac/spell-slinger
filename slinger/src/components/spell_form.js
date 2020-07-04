import React from 'react';
import { Formik } from "formik"
import { TextField, Button } from '@material-ui/core';


class SpellForm extends React.Component {
  constructor(props){
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
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <TextField
              name="spell"
              onChange={data => {
                this.setState({spell: data.currentTarget.value})
                this.props.updateSpell(data.currentTarget.value)
                //console.log(this.state);
              }}
              onBlur={handleBlur}
            />
            <Button type="submit">submit</Button>
          </form>
        )}</Formik>

    );
  }
}
export default SpellForm;