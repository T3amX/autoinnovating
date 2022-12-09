import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProjectContent.scss";


const ProjectContent = (props) => {


  const FindIndexById = (arr, id) => {
    return arr.filter((el) => {
      return el.id === id;
    })[0];
  };

  const deleteIdea = () => {
    props.deleteCurrentProject(props.currentProject.id)
    navigate("/all_projects/");
  }

  const navigate = useNavigate();

  let teamElements = props.participants.map((t) => {
    return (
      <Link className="col-sm-3 project_profile_item" to={"/profile/" + t.id}>
      <div className="">
        <div className="row">
          <span className="project_profile_nick">{t.nickname}</span>
        </div>
        <div className="row">
          <span className="project_profile_role">{t.role}</span>
        </div>
        <div className="row">
          <div className="col-sm">
            <p className="project_profile_desc">{t.info ? t.info : 'Информация отсутствует'}</p>
          </div>
        </div>
      </div>
      </Link>
    );
  });

  if (!props.propsIsLoading) {

    return (
      <div className="row project">
        <div className="row">
          <div className="col-sm">
            <h1>{props.currentProject.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <h2>О проекте : </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <p>{props.currentProject.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <h4>Участники проекта : </h4>
          </div>
        </div>

        <div className="row project_profile">
          {teamElements != [] ? (
            teamElements
          ) : (
            <div className=" col-sm-3 project_profile_item">
              Тут пока никого нет...
            </div>
          )}
        </div>

        {props.id === props.currentProject.credential_id && (
          <div className="row more_action">
            <div className="col-sm">
              <Link to={'./find_more'}>Найти участников</Link>
            </div>
            <div className="col-sm">
              <Link to="./project_editor">Редактировать проект</Link>
            </div>
            <div className="col-sm">
              <Link to="/project/create_new">Создать новый</Link>
            </div>
            <div className="col-sm delete_project">
              <span onClick={deleteIdea}>Удалить проект</span>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ProjectContent;
