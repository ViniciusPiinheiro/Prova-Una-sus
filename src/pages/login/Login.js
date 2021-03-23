import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

import Notification from "../../components/Notification";
// styles
import useStyles from "./styles";

// logo
import logo2 from "../../images/logo2.png";

// context
import { useUserDispatch, loginUser, createUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [cpasswordValue, setcPasswordValue] = useState("");
  var [createPasswordValue, setcreatePasswordValue] = useState("");
  var [createLoginValue, setcreateLoginValue] = useState("");
  const notificationsError = localStorage.getItem('notificationsError');
  const notificationsSuccess = localStorage.getItem('notificationsSuccess');
  function ErrorManagment() {
    return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%!?])[0-9a-zA-Z$*%&@#!?]{8,32}$/).test(createPasswordValue) &&
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{4,50}$/).test(nameValue) && new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).test(createLoginValue) && (createPasswordValue === cpasswordValue)
  }
  function validateSenha() {
    return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%!?])[0-9a-zA-Z$*%&@#!?]{8,32}$/).test(createPasswordValue) || createPasswordValue.length === 0;
  }
  function validateNome() {
    return new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{4,50}$/).test(nameValue) || nameValue.length === 0;
  }
  function validateEmail() {
    return new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).test(createLoginValue) || createLoginValue.length === 0;
  }
  function validateCSenha() {
    return createPasswordValue === cpasswordValue || cpasswordValue.length === 0;
  }
  console.log(isLoading);
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <img src={logo2}></img>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="Novo Usuário" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Grid className={classes.formDividerContainer}>
                <Typography className={classes.formDividerWord}>Bem-vindo(a)!</Typography>
                <Typography className={classes.formDividerWord}>Faça login ou cadastre-se para acessar a ferramenta.</Typography>
              </Grid>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="E-mail"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Senha"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  ESQUECI MINHA SENHA
                </Button>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button className={classes.loginButton}
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: "12px", fontWeight: "500" }}
                  >
                    Acessar
                  </Button>
                )}
              </div>
              <div>
                <br>
                </br>
              </div>
              {notificationsError !== null &&
                <Notification
                  className={classes.notificationItem}
                  shadowless
                  type="message"
                  message={notificationsError}
                  variant="contained"
                  color="secondary"
                />
              }
              {notificationsSuccess !== null &&
                <Notification
                  className={classes.notificationItem}
                  shadowless
                  type="message"
                  message={notificationsSuccess}
                  variant="contained"
                  color="success"
                />
              }
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Grid className={classes.formDividerContainer}>
                <Typography className={classes.formDividerWord}>Informe os dados abaixo para se cadastrar:</Typography>
              </Grid>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                label="Nome"
                placeholder="Nome Completo"
                type="text"
                fullWidth
                required
                error={!validateNome()}
                helperText={!validateNome() ? "Deve conter peno menos 3 caracteres e ser composto apenas por letras." : ""}
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={createLoginValue}
                onChange={e => setcreateLoginValue(e.target.value)}
                margin="normal"
                label="E-mail"
                type="email"
                fullWidth
                required
                error={!validateEmail()}
                helperText={!validateEmail() ? "Necessário ser um e-mail válido." : ""}
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={createPasswordValue}
                onChange={e => setcreatePasswordValue(e.target.value)}
                margin="normal"
                label="Senha"
                type="password"
                fullWidth
                required
                error={!validateSenha()}
                helperText={!validateSenha() ? "Deve conter 8 caracteres ou mais, ao menos um caractere especial, uma letra maiúscula e um dígito numérico." : ""}
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={cpasswordValue}
                onChange={e => setcPasswordValue(e.target.value)}
                margin="normal"
                label="Confirmar senha"
                type="password"
                fullWidth
                required
                error={!validateCSenha()}
                helperText={!validateCSenha() ? "As senhas precisam ser iguais." : ""}
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      createUser(
                        userDispatch,
                        createLoginValue,
                        createPasswordValue,
                        nameValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={!ErrorManagment()}
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.createAccountButton}
                  >
                    CRIAR CONTA
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2020 TODOS OS DIREITOS RESERVADOS À LOREN IPSUM
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
