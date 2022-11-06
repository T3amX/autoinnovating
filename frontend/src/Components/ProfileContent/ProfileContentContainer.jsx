import React, { useEffect, useState } from "react";
import ProfileContent from "./ProfileContent";
import { connect } from "react-redux";
import { compose } from "redux";
import { setUserDataThunk } from "../../store/userReducer";
import { getDataThunk } from "../../store/authReducer";
import {
  getAllCategoriesThunk,
  getAllProjectsThunk,
} from "../../store/ProjectReducer";
import { useNavigate, useParams } from "react-router-dom";

const ProfileContentContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);

  const params = useParams()


  useEffect(() => {
    props.getAllCategoriesThunk().then(() => {
      props.getAllProjectsThunk();
      props.getDataThunk(params.id);
      props.setUserDataThunk(params.id).then(() => {
        setPropsIsLoading(false);
      });
    });
  }, [params.id]);

  return (
    <ProfileContent
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
    />
  );
};

let mapStateToProps = (state) => {

  return {
    currentUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    isAdmin: state.auth.isAdmin,
    categories: state.projects.categories,
    projects: state.projects.projects,
    userData: state.user.userData,
    login: state.auth.login,
    email: state.auth.email,
  };
};


export default compose(
  connect(mapStateToProps, {
    setUserDataThunk,
    getDataThunk,
    getAllProjectsThunk,
    getAllCategoriesThunk,
  })
)(ProfileContentContainer);