import React from "react";
import axios from "axios";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, createUser };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  localStorage.removeItem('notificationsError');
  localStorage.removeItem('notificationsSuccess');
  const url = "https://60592955b11aba001745bc69.mockapi.io/user";
  setError(false);
  setIsLoading(true);
  let logged = false;
  axios
    .get(url)
    .then(data => {
      if (data.data.length === 0) {
        setTimeout(() => {
          localStorage.setItem('notificationsError', "Nenhum usuario cadastrado!");
          setError(true);
          window.location.reload(false);
        }, 2000);
      } else {
        data.data.map(e => {
          if (e.email === login) {
            if (e.senha === password) {
              localStorage.setItem('notificationsSuccess', "Logado com sucesso!");
              setError(true);
              setIsLoading(false);
              window.location.reload(false);
              logged = true;
            }
          }
        })
        if (logged !== true) {
          localStorage.setItem('notificationsError', "Senha incorreta!");
          setError(true);
          setIsLoading(false);
          window.location.reload(false);
        }
      }
    })
  setError(true);
  setIsLoading(false);
}
function createUser(dispatch, login, password, nome, history, setIsLoading, setError) {
  localStorage.removeItem('notificationsError');
  localStorage.removeItem('notificationsSuccess');
  const url = "https://60592955b11aba001745bc69.mockapi.io/user";
  setError(false);
  setIsLoading(true);
  axios
    .post(url, { email: login, senha: password, nome: nome })
    .then(data => {
      setTimeout(() => {
        localStorage.setItem('notificationsSuccess', "Usuario criado com sucesso!");
        setError(true);
        setIsLoading(false);
        window.location.reload(false);
      }, 2000);
    })
  setError(true);
  setIsLoading(false);
}
function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
