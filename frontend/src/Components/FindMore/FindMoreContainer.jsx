import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { createInviteThunk } from "../../store/authReducer";
import { getSingleProjectThunk } from "../../store/ProjectReducer";
import { getAllUserDataThunk, getUserForSearchThunk, setUserDataThunk } from "../../store/userReducer";
import FindMore from "./FindMore";
const FindMoreContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);
  let projectId = useParams().id
  
  useEffect(() => {
    props.getSingleProjectThunk(projectId)
    props.getUserForSearchThunk().then(() => {
      setPropsIsLoading(false);
    });
  }, []);

  return (
    <FindMore currentProject={props.currentProject} createInviteThunk={props.createInviteThunk} usersData={props.usersData} propsIsLoading={propsIsLoading} />
  );
};

let mapStateToProps = (state) => {
  return {
    usersData: state.user.usersData,
    currentProject: state.projects.currentProject
  };
};


export default compose(
  connect(mapStateToProps, { setUserDataThunk, getUserForSearchThunk, createInviteThunk, getSingleProjectThunk })
)(FindMoreContainer);
