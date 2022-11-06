import React from "react";
import GoToLogin from "./GoToLogin";
import { connect } from "react-redux";
import { compose } from "redux";

const GoToLoginContainer = (props) => {
  return <GoToLogin isAuth={props.isAuth}/>;
};

let mapStateToProps = (state) => {
  return{
    isAuth: state.auth.isAuth
  }
}

let mapDispatchToProps = (dispatch) => {
  return{}
}

export default compose(connect(mapStateToProps,mapDispatchToProps))(GoToLoginContainer)