import React from "react";
import css from "./Calculator.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { width } from "@mui/system";
const Wrapper = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
};
const Container = {
  background:
    "radial-gradient(ellipse at 0% -20%, rgba(54, 65, 86, 1) 0%, rgba(40, 44, 52, 1) 100%)",
  width: "fit-content",
  padding: "10px",
  display: "flex",
  gap: "10px",
  "flex-direction": "column",
  "box-shadow": "rgb(8 8 8 / 20%) 10px 7px 29px 0px",
  "border-radius": "5px",
};
const CalcButton = {
  "margin-left": "auto",
  width: "100px",
};
const ButtonCustom = {
  width: "100px",
};

export const Calculator = () => {
  const [result, setResult] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const calcOperation = () => {
    var tempOperation = operation;
    var result = eval(tempOperation);
    setResult(result);
    setOperation("");
    setDisplay(result);
  };

  const handleChange = (string) => {
    var tempOperation = operation;
    var tempNewOperation;
    if (string === "+" || string === "-") {
      tempNewOperation = tempOperation + " " + string + " ";
    } else {
      tempNewOperation = tempOperation + string;
    }

    setOperation(tempNewOperation);
    setDisplay(tempNewOperation);
  };
  return (
    <div id="wrapper" style={Wrapper}>
      <div id="calculator-container" style={Container}>
        <div id="CalculatorDisplay">{display === '' ? '...' : display }</div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <IconButton onClick={() => handleChange("*")} aria-label="delete">
            <CloseIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleChange("-")} aria-label="delete">
            <RemoveIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleChange("+")} aria-label="delete">
            <AddIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => handleChange("")}
            style={{ marginLeft: "auto" }}
            aria-label="delete"
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleChange("1")}
            size="large"
            style={ButtonCustom}
          >
            1
          </Button>
          <Button onClick={() => handleChange("2")} style={ButtonCustom}>
            2
          </Button>
          <Button onClick={() => handleChange("3")} style={ButtonCustom}>
            3
          </Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleChange("4")}
            size="large"
            style={ButtonCustom}
          >
            4
          </Button>
          <Button onClick={() => handleChange("5")} style={ButtonCustom}>
            5
          </Button>
          <Button onClick={() => handleChange("6")} style={ButtonCustom}>
            6
          </Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleChange("7")}
            size="large"
            style={ButtonCustom}
          >
            7
          </Button>
          <Button onClick={() => handleChange("8")} style={ButtonCustom}>
            8
          </Button>
          <Button onClick={() => handleChange("9")} style={ButtonCustom}>
            9
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              console.log("operation:" + operation);
              console.log("result:" + result);
              console.log("display:" + display);
            }}
            style={ButtonCustom}
          >
            DEBUG
          </Button>
          <Button
            variant="contained"
            style={CalcButton}
            onClick={() => calcOperation()}
          >
            =
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
