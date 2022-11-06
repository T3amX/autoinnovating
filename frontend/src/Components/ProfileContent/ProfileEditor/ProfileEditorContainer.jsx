import React from "react";
import ProfileEditor from "./ProfileEditor";
import "./ProfileEditor.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateProfileInfoThunk } from "../../../store/userReducer";

const ProfileEditorContainer = (props) => {
  return <ProfileEditor updateInfo={props.updateProfileInfoThunk} login={props.login} id={props.id} userData={props.userData} />;
};

let mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
    id: state.auth.id,
    login: state.auth.login
  };
};

let mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(connect(mapStateToProps,{updateProfileInfoThunk}))(ProfileEditorContainer);
