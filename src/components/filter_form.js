import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FilterData from "../data/filters.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FilterForm() {
  const classes = useStyles();
  const [cla, setCla] = React.useState('');
  const [level, setLevel] = React.useState('');

  const [concentration, setConcentration] = React.useState(false);
  const [ritual, setRitual] = React.useState(false);
  const [higher, setHigher] = React.useState(false);

  const handleChangeClass = (event) => {
    setCla(event.target.value);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleChangeCon = () => {
    setConcentration(!concentration);
  };

  const handleChangeRit = () => {
    setRitual(!ritual);
  };

  const handleChangeHig = () => {
    setHigher(!higher);
  };





  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="class-input">Class</InputLabel>
        <Select
          labelId="class-input"
          id="class-select"
          value={cla}
          onChange={handleChangeClass}
        >
          {FilterData["class"].map((name, index) => {
            return <MenuItem value={name} key={index}>{name}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="level-input">Level</InputLabel>
        <Select
          labelId="level-input"
          id="level-select"
          value={level}
          onChange={handleChangeLevel}
        >
          {FilterData["level"].map((name, index) => {
            return <MenuItem value={name} key={index}>{name}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value={concentration}
            onChange={handleChangeCon}
            control={
              <Checkbox color="primary" />
            }
            label="Concentration"
          />
           <FormControlLabel
            value={ritual}
            onChange={handleChangeRit}
            control={
              <Checkbox color="primary" />
            }
            label="Ritual"
          />
           <FormControlLabel
            value={higher}
            onChange={handleChangeHig}
            control={
              <Checkbox color="primary" />
            }
            label="At higher levels"
          />
         
        </FormGroup>
      </FormControl>
      </div>

    </div>
  );
}