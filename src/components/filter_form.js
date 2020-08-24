import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FilterData from "../data/filters.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    align_items: "center",
    justify_content: "center",
    margin: theme.spacing(1),
    minWidth: 75,
    maxWidht: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dropdown: {
    align_items: "center",
    justify_content: "center",
    flex_direction: "vertical",
  },
}));

export default function FilterForm(props) {
  const classes = useStyles();
  const [cla, setCla] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [concentration, setConcentration] = React.useState(false);
  const [ritual, setRitual] = React.useState(false);
  const [higher, setHigher] = React.useState(false);
  const [material_cost, setMaterial_cost] = React.useState(false);

  const getState = () => {
    return {
      class: cla,
      level: level,
      concentration: concentration,
      ritual: ritual,
      higher: higher,
      material_cost: material_cost,
    };
  };

  const handleChangeClass = (event) => {
    setCla(event.target.value);
    const state = getState();
    state.class = event.target.value;
    props.updateSpell(null, state);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
    const state = getState();
    state.level = event.target.value;
    props.updateSpell(null, state);
  };

  const handleChangeCon = () => {
    setConcentration(!concentration);
    const state = getState();
    state.concentration = !concentration;
    props.updateSpell(null, state);
  };

  const handleChangeRit = () => {
    setRitual(!ritual);
    const state = getState();
    state.ritual = !ritual;
    props.updateSpell(null, state);
  };

  const handleChangeHig = () => {
    setHigher(!higher);
    const state = getState();
    state.higher = !higher;
    props.updateSpell(null, state);
  };

  const handleChangeMaterialCost = () => {
    setMaterial_cost(!higher);
    const state = getState();
    state.material_cost = !material_cost;
    props.updateSpell(null, state);
  };

  return (
    <React.Fragment>

      <div className={classes.dropdown}>
        <FormControl  className={classes.formControl} component="fieldset">
          <InputLabel id="class-input">Class</InputLabel>
          <Select
            labelId="class-input"
            id="class-select"
            value={cla}
            onChange={handleChangeClass}
          >
            {FilterData["class"].map((name, index) => {
              return name === "-" ? (
                <MenuItem value={""} key={index}>
                  {name}
                </MenuItem>
              ) : (
                <MenuItem value={name} key={index}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl} component="fieldset">
          <InputLabel id="level-input">Level</InputLabel>
          <Select
            labelId="level-input"
            id="level-select"
            value={level}
            onChange={handleChangeLevel}
          >
            {FilterData["level"].map((name, index) => {
              return name === "-" ? (
                <MenuItem value={""} key={index}>
                  {name}
                </MenuItem>
              ) : (
                <MenuItem value={name} key={index}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className={classes.dropdown}>
        <FormControl className={classes.formControl} component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value={concentration}
              onChange={handleChangeCon}
              control={<Checkbox color="primary" />}
              label="Concentration"
            />
            <FormControlLabel
              value={ritual}
              onChange={handleChangeRit}
              control={<Checkbox color="primary" />}
              label="Ritual"
            />
            <FormControlLabel
              value={higher}
              onChange={handleChangeHig}
              control={<Checkbox color="primary" />}
              label="Scales"
            />
            <FormControlLabel
              value={material_cost}
              onChange={handleChangeMaterialCost}
              control={<Checkbox color="primary" />}
              label="Material cost"
            />
          </FormGroup>
        </FormControl>
      </div>
    </React.Fragment>
  );
}
