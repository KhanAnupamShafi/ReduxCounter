// api url - https://jsonplaceholder.typicode.com/users
// middleware- redux-thunk
// axios api

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

/* ------------------------------- Constants ------------------------------ */
const GET_USERS_REQUEST = "GET_USERS_REQUEST";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const GET_USERS_FAILED = "GET_USERS_FAILED";
const USERS_URI = "https://jsonplaceholder.typicode.com/users";

/* --------------------------------- States --------------------------------- */

const initialUsersState = {
  users: [],
  isLoading: false,
  error: null,
};

/* --------------------------------- Actions -------------------------------- */

const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};
const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};
const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED,
    payload: error,
  };
};

/* --------------------------------- Reducer -------------------------------- */

const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

/* -------------------------- Async Action Creator -------------------------- */

// redux-thunk allows us to return a function instead of an Object

const fetchData = () => {
  return (dispatch) => {
    dispatch(getUsersRequest());
    axios
      .get(USERS_URI)
      .then((res) => {
        const users = res.data;
        dispatch(getUsersSuccess(users));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(getUsersFailed(error));
      });
  };
};

/* ---------------------------------- Store --------------------------------- */
const store = createStore(usersReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchData());
