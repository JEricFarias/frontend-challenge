import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useTheme, makeStyles } from "@material-ui/core";
import {
  Clear,
  Delete,
  Edit,
  PersonAdd,
  SearchOutlined,
} from "@material-ui/icons";
import {
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import UserApi from "../service/User";

import OverrideButton from "../components/OverrideButton";
import DeleteDialog from "../components/DeleteDialog";
import { Link } from "react-router-dom";
import Styles from "../style/tyles";
import Alert from "../components/Alert";

const Actions = {
  User: {
    LIST: "LIST",
    START_DELETE: "START_DELETE",
    CONFIRM_DELETE: "CONFIRM_DELETE",
    CANCEL_DELETE: "CANCEL_DELETE",
  },
  SET_MESSAGE: "SET_MESSAGE",
  SET_ERROR: "SET_ERROR",
  SET_OPEN: "SET_OPEN",
};

const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case Actions.User.LIST:
      return { ...state, users: payload.users };

    case Actions.User.START_DELETE:
      return { ...state, currentUser: payload.user, open: true };

    case Actions.User.CONFIRM_DELETE:
      const { id } = payload;
      return {
        ...state,
        users: state.users.filter((u) => u.id !== id),
        message: "Usuário removido.",
        open: false,
      };

    case Actions.SET_ERROR:
      return { ...state, err: payload.message };

    case Actions.SET_MESSAGE:
      return { ...state, message: payload.message };

    case Actions.SET_OPEN:
      return { ...state, open: payload };

    default:
      return state;
  }
};

const useStyle = makeStyles(Styles.paper);

const User = () => {
  const theme = useTheme();
  const classes = useStyle();

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [state, dispatch] = useReducer(reducer, {
    users: [],
    currentUser: null,
    open: false,
    err: "",
    message: "",
  });

  // Effects
  useEffect(() => {
    (async () => {
      const apiRes = await UserApi.list();
      if (apiRes.status === 200) {
        dispatch({ type: Actions.User.LIST, payload: { users: apiRes.data } });
      } else {
        dispatch({
          type: Actions.SET_ERROR,
          payload: { message: "Lista de usuários não pode ser carregada." },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (state.message !== null) {
      setTimeout(() => {
        dispatch({ type: Actions.SET_MESSAGE, payload: { message: null } });
      }, 3000);
    }
  }, [state.message]);

  useEffect(() => {
    setUsers(state.users);
    setName("");
    setEmail("");
  }, [state.users]);

  // Handles
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (name || email) {
        const filtered = state.users.filter((u) => {
          const result =
            u.first_name
              .toLowerCase()
              .includes(name ? name.toLowerCase() : null) ||
            u.last_name
              .toLowerCase()
              .includes(name ? name.toLowerCase() : null) ||
            u.email.toLowerCase().includes(email ? email.toLowerCase() : null);
          return result;
        });
        setUsers(filtered);
        return;
      }
      setUsers(state.users);
    },
    [email, name, state.users]
  );

  const handleClear = () => {
    setEmail("");
    setName("");
    setUsers(state.users);
  };

  const handleDelete = (user) => {
    dispatch({ type: Actions.User.START_DELETE, payload: { user } });
  };

  const handleConfirm = () => {
    const { id } = state.currentUser;
    UserApi.delete(id).then((result) => {
      if (result.status === 204) {
        dispatch({ type: Actions.User.CONFIRM_DELETE, payload: { id } });
      } else {
        dispatch({
          type: Actions.SET_ERROR,
          payload: { message: "Não foi possível remover o usuário." },
        });
      }
    });
  };

  return (
    <>
      {/* Dialog de confirmação  */}
      <DeleteDialog
        open={state.open}
        user={state.currentUser}
        handleConfirm={handleConfirm}
        handleClose={() => dispatch({ type: Actions.SET_OPEN, payload: false })}
      ></DeleteDialog>

      {/* Alertas de feedback. */}
      <Alert
        open={state.message ? true : false}
        handleClose={() =>
          dispatch({
            type: Actions.SET_MESSAGE,
            payload: {
              message: "",
            },
          })
        }
        message={state.message}
        key="success"
        severity="success"
      />
      <Alert
        open={state.err ? true : false}
        handleClose={() =>
          dispatch({
            type: Actions.SET_ERROR,
            payload: {
              message: "",
            },
          })
        }
        message={state.err}
        key="error"
        severity="error"
      />

      {/* Busca container*/}
      <Paper>
        <Container className={classes.container}>
          <form onSubmit={handleSearch} autoComplete="off" noValidate>
            <Typography variant="h6" style={{ marginBottom: theme.spacing(2) }}>
              Buscar
            </Typography>
            <TextField
              variant="outlined"
              name="name"
              label="Nome do usuário"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Busca por nome ou sobrenome..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              name="email"
              label="E-mail"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Busca por email..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Divider className={classes.verticalSpace} />
            <OverrideButton
              label="Busca"
              icon={<SearchOutlined />}
              primary
              type="submit"
            />
            {name || email ? (
              <Button
                variant="text"
                startIcon={<Clear />}
                onClick={handleClear}
                className={classes.buttonHorizontalSpace}
              >
                limpar
              </Button>
            ) : null}
          </form>
        </Container>
      </Paper>

      {/* Botão adcionar usuário */}
      <div className={classes.verticalSpace}>
        <OverrideButton label="adcionar usuário" icon={<PersonAdd />} />
      </div>

      {/* Tabela de usuários */}
      <TableContainer style={{ marginBottom: theme.spacing(10) }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome do usuário</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              ? users.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell align="left">{`${user.first_name} ${user.last_name}`}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Link to={`/users/${user.id}`}>
                            <Button
                              variant="text"
                              startIcon={<Edit style={{ fontSize: 16 }} />}
                              disableElevation={true}
                              style={{
                                backgroundColor: "transparent",
                                fontSize: 14,
                                fontWeight: theme.typography.fontWeightMedium,
                              }}
                            >
                              edite
                            </Button>
                          </Link>

                          <Divider
                            color="#456"
                            orientation="vertical"
                            flexItem
                            style={{
                              marginLeft: theme.spacing(1),
                              marginRight: theme.spacing(1),
                            }}
                          />

                          <Button
                            onClick={() => handleDelete(user)}
                            variant="text"
                            startIcon={
                              <Delete
                                style={{ fontSize: 16, color: red[500] }}
                              />
                            }
                            disableElevation={true}
                            style={{
                              backgroundColor: "transparent",
                              fontSize: 14,
                              fontWeight: theme.typography.fontWeightMedium,
                            }}
                          >
                            delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default User;
