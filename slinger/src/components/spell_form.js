import React from 'react';
import { Formik } from "formik"
import { TextField, Button } from '@material-ui/core';


class SpellForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ spell: "test" }}
        onSubmit={data => {
          console.log(data);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleChange}>
            <TextField
              name="spell"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit">submit</Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}</Formik>

    );
  }
}
export default SpellForm;