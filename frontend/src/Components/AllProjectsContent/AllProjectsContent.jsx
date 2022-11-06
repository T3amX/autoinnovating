import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllProjectsContent.scss";

const AllProjectsContent = (props) => {

  const navigate = useNavigate();

 

  const FindIndexById = (arr, id) => {
    return arr.filter((el) => {
      return el.id === id;
    })[0];
  };



  let projectsElements = props.projects.map((p) => {
    let shortDesc = p.description.slice(0,100)
    let currentDesc = p.description.length < 100 ? p.description : shortDesc + '...'

    return (
      <div className="col-sm-3 project_profile_item">
        <div className="row">
          <span className="project_profile_nick">{p.title}</span>
        </div>
        <div className="row">
          <span className="project_profile_role">
            Категория : {FindIndexById(props.categories, p.category_id).name}
          </span>
        </div>
        <div className="row">
          <div className="col-sm">
            <p className="project_profile_desc">{currentDesc}</p>
          </div>
        </div>
        <div className="row">
          <Link className="project_profile_button" to={"/project/" + p.id}>
            Проект
          </Link>
        </div>
      </div>
    );
  });

  if (!props.isAuth) {
    navigate("/");
  } else {
    return (
      <div className="row all_projects">
        <div className="row">
          <div className="col-sm">
            <h1>Все проекты:</h1>
          </div>
        </div>

        <div className="row project_row">{projectsElements}</div>

        <div className="row pagination">
        </div>
      </div>
    );
  }
};

export default AllProjectsContent;
