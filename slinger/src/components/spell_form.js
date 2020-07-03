import React from 'react';
import { Formik } from "formik"
import { TextField, Button } from '@material-ui/core';


export default function SpellForm() {

  return (
    <Formik
      initialValues={{ spell: "test" }}
      onSubmit={data => {
        console.log(data);
      }
 }
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            name="spell"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit">submit</Button>
          <pre>{JSON.stringify(values, null, 5)}</pre>
        </form>
      )}</Formik>

  );
}
