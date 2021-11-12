import {
  Container,
  Divider,
  makeStyles,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import OverrideButton from "../components/OverrideButton";
import User from "../service/User";
import Styles from "../style/tyles";

const useStyle = makeStyles(Styles.paper);

function UserUpdate() {
  const { userId } = useParams();
  const navegate = useNavigate();
  const theme = useTheme();
  const classes = useStyle();

  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    (async () => {
      const res = await User.find(userId);
      if (res.status === 200) {
        setUser(res.data);
      } else {
        setErr("Usuário não encontrado.");
      }
    })();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await User.update(userId, user);
      if (res.status === 200) {
        setMessage("Usuário atualizado.");
        setTimeout(() => {
          navegate("/users");
        }, 3000);
      } else {
        setErr("Não foi possível atualizar usuário");
      }
    },
    [navegate, user, userId]
  );

  return (
    <>
      <Alert
        open={message ? true : false}
        handleClose={() => setMessage("")}
        message={message}
        key="success"
        severity="success"
      />
      <Alert
        open={err ? true : false}
        handleClose={() => setErr("")}
        message={err}
        key="error"
        severity="error"
      />
      <Paper>
        <Container className={classes.container}>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Typography variant="h6" style={{ marginBottom: theme.spacing(2) }}>
              Atualizar
            </Typography>
            <TextField
              variant="outlined"
              name="first_name"
              label="Nome"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={user?.first_name}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              name="last_name"
              label="Sobrenome"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={user?.last_name}
            />
            <Divider className={classes.verticalSpace} />
            <OverrideButton
              label="Atualiza"
              // icon={<SearchOutlined />}
              primary
              type="submit"
            />
          </form>
        </Container>
      </Paper>
    </>
  );
}

export default UserUpdate;
