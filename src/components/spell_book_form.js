import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState(""); // user input string

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
          <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Spell Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new spell book
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            onChange={(data) => {
              setVal(data.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.type === "keydown" && event.key === "Enter") {
                console.log(val, val.length);
                if (val.length > 0) {
                  props.addSpellBook(val);
                  event.preventDefault()
                  handleClose();
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log(val, val.length);
              if (val.length > 0) {
                props.addSpellBook(val);
              }
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
