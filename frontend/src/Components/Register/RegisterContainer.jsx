import React from "react";
import Register from "./Register";
import { connect } from "react-redux";
import { compose } from "redux";
import { registerData } from "../../store/authReducer";
import { setRegThunk } from "../../store/authReducer";


const RegisterContainer = (props) => {
  return <Register  registerData={props.setRegThunk} />;
};

let mapStateToProps = (state) => {
  return {};
};

export default compose(connect(mapStateToProps, {setRegThunk}))(
  RegisterContainer
);
