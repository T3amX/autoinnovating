import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { deleteCurrentProjectThunk, getAllCategoriesThunk, getAllProjectParticipantsThunk, getSingleProjectThunk } from "../../store/ProjectReducer";
import ProjectContent from "./ProjectContent";
const ProjectContentContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);

  let localProjectId = useParams().id

  useEffect(() => {
    props.getAllCategoriesThunk()
    props.getAllProjectParticipantsThunk(localProjectId)
    props.getSingleProjectThunk(localProjectId).then(() => {
      setPropsIsLoading(false);
    });
  }, []);

  return <ProjectContent  deleteCurrentProject={props.deleteCurrentProjectThunk} categories={props.categories} localProjectId={localProjectId} id={props.id} participants={props.participants} currentProject={props.currentProject} propsIsLoading={propsIsLoading} />;
};

let mapStateToProps = (state) => {
  return {
    categories: state.projects.categories,
    participants: state.projects.participants,
    currentProject: state.projects.currentProject,
    userData: state.user.userData,
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
  };
};

export default compose(connect(mapStateToProps, {getSingleProjectThunk, getAllProjectParticipantsThunk, getAllCategoriesThunk, deleteCurrentProjectThunk}))(
  ProjectContentContainer
);
