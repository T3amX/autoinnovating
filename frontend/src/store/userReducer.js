import { userAPI, authAPI } from "../api/api";

const GET_USER_DATA = "AutoInnovating/user/GET_USER_DATA";
const GET_ALL_USERS_DATA = "AutoInnovating/user/GET_ALL_USERS_DATA";

let initialState = {
  userData: null,
  usersData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...state,
        userData: { ...action.userData },
      };
    }
    case GET_ALL_USERS_DATA: {
      return {
        ...state,
        usersData: [...action.lines],
      };
    }
    default:
      return state;
  }
};

export const setUserData = (userData) => ({
  type: GET_USER_DATA,
  userData,
});

export const getUserForSearch = (lines) => {
  return {
    type: GET_ALL_USERS_DATA,
    lines,
  };
};


export const updateProfileInfoThunk = (id, profileInfo) => {
  return async (dispatch) => {
    let response = await userAPI.updateProfileInfo(id, profileInfo);
    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
  };
};

export const setUserDataThunk = (id) => {
  return async (dispatch) => {
    let response = await userAPI.getData(id);
    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
    dispatch(setUserData(response.data.user));
  };
};

export const getUserForSearchThunk = () => {
  return async (dispatch) => {
    let response = await userAPI.getUserForSearch();

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);


    dispatch(getUserForSearch(response.data.lines));
  };
};

export default userReducer;
