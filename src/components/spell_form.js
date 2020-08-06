import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
//import IconButton from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";

class SpellForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { spell: "" };
  }

  render() {
    return (
      <Formik initialValues={{ spell: "test" }}>
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form
            align="center"
            onSubmit={handleSubmit}
            onChange={handleChange}
            className={this.props.root}
            autoComplete="off"
          >
            {/*
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
            */}

            <TextField
              name="spell"
              onChange={(data) => {
                this.setState({ spell: data.currentTarget.value });
                this.props.updateSpell(data.currentTarget.value);
                //console.log(this.state);
              }}
              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
      </Formik>
    );
  }
}

export default SpellForm;
