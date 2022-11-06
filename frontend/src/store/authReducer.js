import { authAPI, userAPI } from "../api/api";
import jwtDecode from "jwt-decode";

const SET_AUTH_DATA = "AutoInnovating/auth/SET_AUTH_DATA";
const REGISTER_NEW_DATA = "AutoInnovating/auth/REGISTER_NEW_DATA";
const SET_AUTH_USER_DATA = "AutoInnovating/auth/SET_AUTH_USER_DATA";
const GET_ALL_USERS = "AutoInnovating/auth/GET_ALL_USERS";
const BAN_INFO = "AutoInnovating/auth/BAN_INFO";
const LOGOUT = "AutoInnovating/auth/LOGOUT";
const DELETE_USER = "AutoInnovating/auth/DELETE_USER";
const UPDATE_USERS_DATA = "AutoInnovating/auth/DELETE_USER"

let initialState = {
  isAuth: false,
  isAdmin: false,
  id: null,
  login: null,
  email: null,
  allUsersData: [],
  banTrigger: "",
};

const FindIndexById = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return i;
    }
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA: {
      return {
        ...state,
        isAdmin: action.loginData.is_admin,
        id: action.loginData.id,
        isAuth: true,
      };
    }
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        login: action.authData.login,
        email: action.authData.email,
      };
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        allUsersData: [...action.lines],
      };
    }
    case BAN_INFO: {
      let temp = [...state.allUsersData];
      if (temp[FindIndexById(temp, action.userId)].is_disabled) {
        temp[FindIndexById(temp, action.userId)].is_disabled = false;
      } else {
        temp[FindIndexById(temp, action.userId)].is_disabled = true;
      }
      return {
        ...state,
        allUsersData: [...temp],
      };
    }
    case LOGOUT: {
      return {
        initialState,
      };
    }
    case DELETE_USER: {
      let temp = [...state.allUsersData];
      temp[FindIndexById(temp, action.userId)].splice(FindIndexById(temp, action.userId), 1)
      return {
        ...state,
        allUsersData: [...temp],
      };
    }
    case UPDATE_USERS_DATA: {
      let temp = [...state.allUsersData];
      if (temp[FindIndexById(temp, action.userId)].is_admin) {
        temp[FindIndexById(temp, action.userId)].is_admin = false;
      } else {
        temp[FindIndexById(temp, action.userId)].is_admin = true;
      }
      return {
        ...state,
        allUsersData: [...temp],
      };
    }
    default:
      return state;
  }
};

// AC'S
export const setAuth = (loginData) => ({
  type: SET_AUTH_DATA,
  loginData,
});

export const setAuthUserData = (authData) => ({
  type: SET_AUTH_USER_DATA,
  authData,
});

export const getAllUsersAction = (lines) => {
  return {
    type: GET_ALL_USERS,
    lines,
  };
};

export const banunbanUserAction = (userId) => {
  return {
    type: BAN_INFO,
    userId,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const deleteUserAction = (userId) => {
  return {
    type: DELETE_USER,
    userId,
  };
};

export const updateUsersDataAction = (usersId, newData) => {
  return {
    type: UPDATE_USERS_DATA,
    usersId,
    newData,
  }
}


// THUNKS
export const setRegThunk = (regData) => {
  return async (dispatch) => {
    let response = await authAPI.registration(regData);
  };
};

// GET DATA AFTER LOGIN
export const getDataThunk = (id) => {
  return async (dispatch) => {
    let response = await authAPI.getUserData(id);
    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
    dispatch(setAuthUserData(response.data.user));
  };
};

export const setAuthThunk = (authData) => {
  return async (dispatch) => {
    let response = await authAPI.login(authData);
    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
    if (response.data.token) {
      dispatch(setAuth(jwtDecode(response.data.token)));
    }
  };
};

export const getAllUsersThunk = () => {
  return async (dispatch) => {
    let response = await authAPI.getAllUsers();

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);

    dispatch(getAllUsersAction(response.data.lines));
  };
};

export const updateUsersDataThunk = (userId, newData) => {
  return async (dispatch) => {
    let response = await authAPI.updateUsersData(userId, newData);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);

    dispatch(updateUsersDataAction(userId, newData))
  };
};

export const deleteUserThunk = (userId) => {
  return async (dispatch) => {
    let response = await authAPI.deleteUser(userId);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
    dispatch(deleteUserAction(userId));
  };
};

export const banunbanUserThunk = (userId) => {
  return async (dispatch) => {
    let response = await authAPI.banunbanUser(userId);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);

    dispatch(banunbanUserAction(userId));
  };
};

export default loginReducer;
