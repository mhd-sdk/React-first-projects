import AnimatedPage from "../components/AnimatedPage";
import React from "react";
import "./pageStyles/Project3.css";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { Input, TextField } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import { SnackbarProvider, useSnackbar } from "notistack";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Project3 = () => {
  const [shots, setShots] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackBar = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(true);
  const [openRegister, setOpenRegister] = React.useState(false);
  const closeRegisterModal = () => {
    setOpenRegister(false);
  };
  const dimensionRef = React.useRef("");
  const authenticate = () => {
    var data = {
      username: login,
      password: password,
    };

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/login_check",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("requete");
        setToken(response.data["token"]);
        handleSnackBar("success", "Sending POST to : /api/login_check");
        handleSnackBar("success", "Successfully authenticated");
        closeLoginModal();
        setIsAuthenticated(true);
        setGameState("selecting game");
        getGames();
      })
      .catch(function (error) {
        console.log(error);
        setToken("not authenticated");
        handleSnackBar("error", "Failed to authenticate");
      });
  };
  const [gameList, setGameList] = React.useState([]);
  const getGames = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/api/games",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log("requete");
        handleSnackBar("success", "Sending POST to : /api/games");
        setGameList(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setToken("not authenticated");
        handleSnackBar("error", "Failed to fetch game list");
      });
  };
  const register = () => {
    var data = {
      username: loginRegister,
      password: passwordRegister,
    };

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("requete");
        setToken(response.data["token"]);
        handleSnackBar("success", "Sending POST to : /api/register");
        handleSnackBar("success", "Successfully Registered");
        closeRegisterModal();
        setOpenLogin(true);
      })
      .catch(function (error) {
        console.log(error);
        setToken("not authenticated");
        handleSnackBar("error", "Failed to register");
      });
  };
  const getShots = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/api/shots",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        var json = JSON.stringify(response.data);
        console.log("requete qui recupere les tirs");
        setShots(JSON.parse(json));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [open, setOpen] = React.useState(false);
  const [openConfig, setOpenConfig] = React.useState(false);
  const closeLoginModal = () => {
    setOpenLogin(false);
  };
  const [gameState, setGameState] = React.useState("");
  const [token, setToken] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginRegister, setLoginRegister] = React.useState("");
  const [passwordRegister, setPasswordRegister] = React.useState("");

  const [boardDimension, setBoardDimension] = React.useState(10);
  const generateBoardMatrix = () => {
    var boardMatrix = [];
    for (var y = 0; y < boardDimension; y++) {
      var row = [];
      for (var x = 0; x < boardDimension; x++) {
        row.push("Empty");
      }
      boardMatrix.push(row);
    }
    return boardMatrix;
  };
  const [boardMatrix, setBoardMatrix] = React.useState(
    generateBoardMatrix(11, 11)
  );
  const updateBoardMatrix = () => {
    // copyt content of boardMatrix
    var newBoardMatrix = [...boardMatrix];
    shots.forEach((shot) => {
      if (shot.hit === true) {
        newBoardMatrix[shot.posY][shot.posX] = shot.hit ? "hit" : "miss";
      }
    });
    setBoardMatrix(newBoardMatrix);
  };

  return (
    <AnimatedPage className="wrap">
      {!isAuthenticated && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            style={{
              fontSize: "2rem",
              fontFamily: "Koulen",
              color: "white",
            }}
          >
            You need to be authenticated to play
          </span>
        </div>
      )}
      {gameState === "game not selected" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            style={{
              fontSize: "2rem",
              fontFamily: "Koulen",
              color: "white",
            }}
          >
            <Button
              onClick={() => {
                setGameState("selecting game");
                getGames();
              }}
              variant="contained"
            >
              Plz select game{" "}
            </Button>
          </span>
        </div>
      )}
      {/* conditionnal rendering with gameState */}
      {gameState === "started" && (
        <div className="wrapperProject3">
          <div className="table-container">
            <table className="board">
              <tbody>
                {boardMatrix.map((row, y) => (
                  <tr class="tr" key={y}>
                    {row.map((cell, x) => (
                      <Tooltip
                        followCursor={true}
                        placement="top"
                        title={`posX : ${x}  |  posY : ${y}`}
                      >
                        <td key={x} className={cell}>
                          {cell}
                        </td>
                      </Tooltip>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* button console.log boardmatrix */}
          </div>
        </div>
      )}
      <Dialog
        TransitionComponent={Transition}
        fullWidth="sm"
        open={openLogin}
        onClose={closeLoginModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          fontFamily="Koulen, cursive"
          color="white"
        >
          {"Authenticate :"}
        </DialogTitle>
        <DialogContent>
          <TextField
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            value={login}
            margin="dense"
            id="login"
            label="Login"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <TextField
            value={password}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            margin="dense"
            id="pwd"
            label="Password"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#CD5C5C", fontFamily: "Koulen, cursive " }}
            onClick={() => {
              closeLoginModal();
              setOpenRegister(true);
            }}
          >
            Register
          </Button>
          <Button
            sx={{ color: "#CD5C5C", fontFamily: "Koulen, cursive " }}
            onClick={() => {
              closeLoginModal();
            }}
          >
            cancel
          </Button>
          <Button
            sx={{ color: "#61dafb", fontFamily: "Koulen, cursive" }}
            onClick={() => {
              authenticate();
            }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* register dialog */}
      <Dialog
        TransitionComponent={Transition}
        fullWidth="sm"
        open={openRegister}
        onClose={closeRegisterModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          fontFamily="Koulen, cursive"
          color="white"
        >
          {"Register :"}
        </DialogTitle>
        <DialogContent>
          <TextField
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            value={loginRegister}
            margin="dense"
            id="login"
            label="Login"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setLoginRegister(e.target.value);
            }}
          />
          <TextField
            value={passwordRegister}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            margin="dense"
            id="pwd"
            label="Password"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setPasswordRegister(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#CD5C5C", fontFamily: "Koulen, cursive " }}
            onClick={() => {
              closeRegisterModal();
            }}
          >
            cancel
          </Button>
          <Button
            sx={{ color: "#61dafb", fontFamily: "Koulen, cursive" }}
            onClick={() => {
              register();
            }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* config dialiog */}
      <Dialog
        TransitionComponent={Transition}
        fullWidth="sm"
        open={openConfig}
        onClose={() => {
          setOpenConfig(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          fontFamily="Koulen, cursive"
          color="white"
        >
          {"Game configuration :"}
        </DialogTitle>
        <DialogContent>
          <TextField
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            value={boardDimension}
            margin="dense"
            id="board Dimensions"
            ref={dimensionRef}
            label="Board Dimensions"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setBoardDimension(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#61dafb", fontFamily: "Koulen, cursive" }}
            onClick={() => {
              setOpenConfig(false);
              setBoardMatrix(generateBoardMatrix());
            }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* game select */}
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        fullWidth="sm"
        open={gameState === "selecting game"}
        onClose={() => {
          setOpenConfig(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={() => {
                setGameState("game not selected");
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select a game
            </Typography>
            <Button
              style={{
                "margin-right": "10px",
              }}
              variant="contained"
              endIcon={<RefreshIcon />}
              onClick={() => {
                getGames();
              }}
            >
              Refresh list
            </Button>
            {/* separator */}

            <Button
              onClick={() => {
                setGameState("creating game");
              }}
              variant="contained"
              autoFocus
            >
              Create new game
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {gameList.map((game) => (
            <>
              <ListItem button>
                <ListItemText
                  primary={
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      game code : {game.game_code}
                    </span>
                  }
                  secondary={
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      fleet dimension : {game.fleet_dimension} | number of boats
                      per player : {game.number_of_boats}
                    </span>
                  }
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <DialogTitle
          id="alert-dialog-title"
          fontFamily="Koulen, cursive"
          color="white"
        ></DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>

      <div className="BottomActionBar">
        {" "}
        <Button
          variant="contained"
          onClick={() => {
            setOpenLogin(true);
          }}
        >
          Authenticate
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpenConfig(true);
          }}
        >
          Config
        </Button>
        <Tooltip title={token}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            {" "}
            <KeyIcon color="action" />
          </IconButton>
        </Tooltip>
        <Tooltip title={"refresh token"}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={authenticate}
          >
            <RefreshIcon color="action" />
          </IconButton>
        </Tooltip>
        <Button
          style={{ marginLeft: "auto" }}
          variant="outlined"
          onClick={() => {
            console.log();
          }}
        >
          Debug
        </Button>
        <Button
          style={{ marginLeft: "auto" }}
          variant="outlined"
          onClick={() => {
            console.log(boardMatrix);
          }}
        >
          Log board
        </Button>
      </div>
    </AnimatedPage>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Project3 />
    </SnackbarProvider>
  );
}
