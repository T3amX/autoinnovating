import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout, setAuth } from "../../store/authReducer";
import { setUserDataThunk } from "../../store/userReducer"

const HeaderContainer = (props) => {


  return <Header letLogout={props.letLogout} login={props.login} id={props.id} isAuth={props.isAuth} />;
};

let mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    letLogout: () => {
      dispatch(logout())
    }
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HeaderContainer
);
