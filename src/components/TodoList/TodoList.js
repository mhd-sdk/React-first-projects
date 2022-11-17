import React from "react";
import "./TodoList.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { TextField } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SnackbarProvider, useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var idCount = 1;

const addButton = {
  width: "100%",
  fontFamily: "Koulen, cursive",
  color: "#61dafb",
  borderColor: "grey !important",
};
const clearButton = {
  width: "100%",
  fontFamily: "Koulen, cursive",
  color: "#CD5C5C",
  borderColor: "grey !important",
};

function TodoList() {
  const { enqueueSnackbar } = useSnackbar();
  const [tasks, setTasks] = useState([{ id: "0", label: "learn ReactJs" }]);
  const [open, setOpen] = useState(false);
  const [inputTask, setInputTask] = useState("");

  const handleSnackBar = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };
  const handleInput = (event) => {
    setInputTask(event.target.value);
  };
  const onSubmit = () => {
    handleClose();
    addTask();
  };

  const addTask = (d) => {
    var tempTasks = [];
    tempTasks = tasks;
    tempTasks.push({ id: idCount, label: inputTask });
    idCount += 1;
    setTasks(tempTasks);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearList = () => {
    setTasks([]);
    if (!tasks.length) {
      handleSnackBar("error", "Task list is already empty");
    } else {
      handleSnackBar("success", "Task list has been cleared");
    }
  };

  const deleteTask = (id) => {
    const tempRemoveTask = tasks.filter((item) => item.id !== id);
    setTasks(tempRemoveTask);
  };
  return (
    <>
      <div id="todo-container">
        <span id="todolist-title">TODO LIST</span>

        <div id="add-btn-container">
          <ButtonGroup
            sx={{ width: "100%" }}
            variant="text"
            aria-label="text button group"
          >
            <Button sx={addButton} onClick={handleClickOpen}>
              Add task
            </Button>
            <Button sx={clearButton} onClick={clearList}>
              Clear list
            </Button>
          </ButtonGroup>
        </div>
        <Divider />

        <Box sx={{ width: "100%" }}>
          <nav aria-label="secondary mailbox folders">
            <List>
              {tasks.map(function (task) {
                return (
                  <ListItem
                    disablePadding
                    key={task.id}
                    value={task.label}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          deleteTask(task.id);
                          handleSnackBar(
                            "success",
                            "Task " + task.label + " has been deleted"
                          );
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon fontSize="small" sx={{ color: "white" }} />
                      </IconButton>
                    }
                  >
                    <ListItemButton>
                      <ListItemText
                        className="listItemCustom"
                        primary={task.label}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Box>

        <Dialog
          TransitionComponent={Transition}
          fullWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            fontFamily="Koulen, cursive"
            color="white"
          >
            {"Add task"}
          </DialogTitle>
          <DialogContent>
            <TextField
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              margin="dense"
              id="name"
              label="task description... "
              fullWidth
              variant="filled"
              onChange={handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "#CD5C5C", fontFamily: "Koulen, cursive " }}
              onClick={() => {
                handleClose();
              }}
            >
              cancel
            </Button>
            <Button
              sx={{ color: "#61dafb", fontFamily: "Koulen, cursive" }}
              onClick={() => {
                onSubmit();
                handleSnackBar("success", "Successfully added task");
                handleClose();
              }}
            >
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <TodoList />
    </SnackbarProvider>
  );
}
