import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from 'react';

export default function NewTaskDialog(props) {
  const [open, setOpen] = useState(false);
  const [onSubmit] = useState();
  useEffect(() => {
    if(props.open){
        handleClickOpen();
    }else{
        handleClose();
    }
}, [props.open])

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    
  return (
    <div>
  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"test"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            dialog
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={onSubmit} autoFocus>
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
