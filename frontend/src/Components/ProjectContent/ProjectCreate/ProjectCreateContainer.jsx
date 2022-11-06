import { createNewProjectThunk } from "../../../store/ProjectReducer";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getAllCategoriesThunk } from "../../../store/ProjectReducer";
import ProjectCreate from "./ProjectCreate";

const ProjectCreateContainer = (props) => {

  let [propsIsLoading, setPropsIsLoading] = useState(true);

  useEffect(() => {
    props.getAllCategoriesThunk().then(() => {
      setPropsIsLoading(false);
    });
  }, []);

  return <ProjectCreate createNewProject={props.createNewProjectThunk} categories={props.categories} propsIsLoading={propsIsLoading} />;
};

let mapStateToProps = (state) => {
  return {
    categories: state.projects.categories
  };
};

export default compose(connect(mapStateToProps, {getAllCategoriesThunk, createNewProjectThunk}))(
    ProjectCreateContainer
);
