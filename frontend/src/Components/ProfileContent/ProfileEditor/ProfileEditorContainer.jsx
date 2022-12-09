import React, { useEffect, useState } from "react";
import ProfileEditor from "./ProfileEditor";
import "./ProfileEditor.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  setUserDataThunk,
  updateProfileInfoThunk,
} from "../../../store/userReducer";
import { useParams } from "react-router-dom";

const ProfileEditorContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    props.setUserDataThunk(params.id).then(() => {
      setPropsIsLoading(false);
    });
  }, [params.id]);

  if (propsIsLoading == false) {
    return (
      <ProfileEditor
        propsIsLoading={propsIsLoading}
        updateInfo={props.updateProfileInfoThunk}
        login={props.login}
        id={props.id}
        userData={props.userData}
      />
    );
  }
  
};

let mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
    id: state.auth.id,
    login: state.auth.login,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, { updateProfileInfoThunk, setUserDataThunk })
)(ProfileEditorContainer);
