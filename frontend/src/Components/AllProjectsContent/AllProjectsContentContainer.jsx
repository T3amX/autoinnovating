import React, { useEffect, useState } from "react";
import AllProjectsContent from "./AllProjectsContent";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getAllCategoriesThunk,
  getAllProjectsThunk,
} from "../../store/ProjectReducer";

const AllProjectsContentContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);

  useEffect(() => {
    props.getAllCategoriesThunk();
    props.getAllProjectsThunk().then(() => {
      setPropsIsLoading(false);
    });
  }, []);

  let pagesCount = Math.ceil(props.projects.length / props.limit);

  return (
    <AllProjectsContent
      isAuth={props.isAuth}
      pagesCount={pagesCount}
      getAllProjects={props.getAllProjectsThunk}
      offset={props.offset}
      totalProjectsCount={props.totalProjectsCount}
      limit={props.limit}
      projects={props.projects}
      categories={props.categories}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    offset: state.projects.offset,
    categories: state.projects.categories,
    projects: state.projects.projects,
    totalProjectsCount: state.projects.totalProjectsCount,
    limit: state.projects.limit,
  };
};


export default compose(
  connect(mapStateToProps, { getAllProjectsThunk, getAllCategoriesThunk })
)(AllProjectsContentContainer);
