import React, { useEffect, useState } from "react";
import ProjectEditor from "./ProjectEditor";
import { connect } from "react-redux";
import { compose } from "redux";
import { getAllCategoriesThunk, getSingleProjectThunk, updateCurrentProjectThunk } from "../../../store/ProjectReducer";
import { useParams } from "react-router-dom";

const ProjectEditorContainer = (props) => {

  let localProjectId = useParams().id 

  let [propsIsLoading, setPropsIsLoading] = useState(true);

  useEffect(() => {
    props.getSingleProjectThunk(localProjectId)
    props.getAllCategoriesThunk().then(() => {
      setPropsIsLoading(false);
    });
  }, []);

  return <ProjectEditor currentProject={props.currentProject} localProjectId={localProjectId} updateCurrentProjectThunk={props.updateCurrentProjectThunk} categories={props.categories} propsIsLoading={propsIsLoading} />;
};

let mapStateToProps = (state) => {
  return {
    currentProject: state.projects.currentProject,
    categories: state.projects.categories
  };
};

// let mapDispatchToProps = (state) => {
//   return {};
// };

export default compose(connect(mapStateToProps, {getAllCategoriesThunk, updateCurrentProjectThunk, getSingleProjectThunk}))(
  ProjectEditorContainer
);
