import React, { useEffect, useState } from "react";
import ProfileContent from "./ProfileContent";
import { connect } from "react-redux";
import { compose } from "redux";
import { setUserDataThunk } from "../../store/userReducer";
import {
  acceptUnacceptedIdeaThunk,
  deleteInviteThunk,
  getDataThunk,
  getUnacceptedIdeasThunk,
} from "../../store/authReducer";
import {
  getAllCategoriesThunk,
  getAllProjectsThunk,
} from "../../store/ProjectReducer";
import { useNavigate, useParams } from "react-router-dom";

const ProfileContentContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    props.getAllCategoriesThunk().then(() => {
      props.getUnacceptedIdeasThunk().then(() => {
        props.getAllProjectsThunk();
        props.getDataThunk(params.id);
        props.setUserDataThunk(params.id).then(() => {
          setPropsIsLoading(false);
        });
      });
    });
  }, [params.id]);

  return (
    <ProfileContent
      unacceptedProjects={props.unacceptedProjects}
      allUnacceptedIdeasInfo={props.allUnacceptedIdeasInfo}
      acceptUnacceptedIdeaThunk={props.acceptUnacceptedIdeaThunk}
      allUnacceptedIdeas={props.allUnacceptedIdeas}
      currentUserId={props.currentUserId}
      id={params.id}
      isAuth={props.isAuth}
      isAdmin={props.isAdmin}
      categories={props.categories}
      projects={props.projects}
      propsIsLoading={propsIsLoading}
      login={props.login}
      email={props.email}
      userData={props.userData}
      deleteInviteThunk={props.deleteInviteThunk}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    unacceptedProjects: state.projects.unacceptedProjects,
    allUnacceptedIdeasInfo: state.auth.allUnacceptedIdeasInfo,
    allUnacceptedIdeas: state.auth.allUnacceptedIdeas,
    currentUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    isAdmin: state.auth.isAdmin,
    categories: state.projects.categories,
    projects: state.projects.projects,
    userData: state.user.userData,
    login: state.auth.login,
    email: state.auth.email,
    currentProject: state.projects.currentProject,
  };
};

export default compose(
  connect(mapStateToProps, {
    setUserDataThunk,
    getDataThunk,
    getAllProjectsThunk,
    getAllCategoriesThunk,
    getUnacceptedIdeasThunk,
    acceptUnacceptedIdeaThunk,
    deleteInviteThunk,
  })
)(ProfileContentContainer);
