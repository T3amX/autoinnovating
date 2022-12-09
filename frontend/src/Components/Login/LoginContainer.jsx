import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setAuthThunk } from "../../store/authReducer";
import { setUserDataThunk } from "../../store/userReducer";
import Login from "./Login";


const LoginContainer = (props) => {
  return <Login setAuth={props.setAuthThunk} setAuthFromStorageThunk={props.setAuthFromStorageThunk} />;
};

let mapStateToProps = (state) => {
  return {
    id: state.auth.id
  };
};


export default compose(connect(mapStateToProps, { setAuthThunk }))(
  LoginContainer
);
