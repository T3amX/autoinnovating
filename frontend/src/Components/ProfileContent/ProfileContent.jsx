import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProfileContent.scss";
import tg_link from "./../../assets/img/tg_link.png";
import vk_link from "./../../assets/img/vk_link.png";
import git_link from "./../../assets/img/git_link.png";

const ProfileContent = (props) => {
  let pageProfileId = useParams().id;

  const FindIndexById = (arr, id) => {
    return arr.filter((el) => {
      return el.id === id;
    })[0];
  };

  let navigate = useNavigate();

  if (!props.isAuth) {
    navigate("/");
  }

  if (!props.propsIsLoading) {
    let myIdeasEmlements = props.projects.map((e) => {
      if (e.credential_id == pageProfileId && e.is_project == false) {
        return (
          <Link to={"/project/" + e.id}>
            <div className="row my_ideas_item align-items-center">
              <div className="col-sm">
                <div className="row">
                  <span>{e.title}</span>
                </div>
                <div className="row">
                  <span>
                    {FindIndexById(props.categories, e.category_id).name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      }
    });

    let myUnacceptedIdeas = props.allUnacceptedIdeas.map((e) => {
      return (
        <li className="invite_block_item">
          Инвайт {e.idea_id}{" "}
          <button
            onClick={() => props.acceptUnacceptedIdeaThunk(e.idea_id)}
            className="yes"
          >
            ✓
          </button>
          <button
            className="no"
            onClick={() => props.deleteInviteThunk(e.idea_id, e.credential_id)}
          >
            ×
          </button>
        </li>
      );
    });

    let myProjectsEmlements = props.projects.map((e) => {
      if (e.credential_id == props.id && e.is_project == true) {
        return (
          <Link to={"/project/" + e.id}>
            <div className="row my_projects_item">
              <div className="col-sm">
                <div className="row">
                  <span className="my_projects_item_title">{e.title}</span>
                </div>
                <div className="row">
                  <span className="my_projects_item_desc">
                    Категория :
                    {FindIndexById(props.categories, e.category_id).name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      }
    });

    return (
      <div className="row profile">
        <div className="col-sm-7">
          {pageProfileId == props.currentUserId ? (
            <div className="row">
              <div className="col-sm">
                <h1>{props.login}</h1>
              </div>
            </div>
          ) : (
            <span></span>
          )}
          <div className="row">
            <div className="col-sm">
              <ul className="profile_data_list">
                <li>
                  {props.userData.name
                    ? props.userData.name
                    : "Имя не указанно"}
                </li>
                <li>
                  {props.userData.sex ? (
                    <li>{props.userData.sex == "м" ? "Мужской" : "Женский"}</li>
                  ) : (
                    "Пол не указан"
                  )}
                </li>
                <li>
                  {props.userData.city
                    ? props.userData.city
                    : "Город не указан"}
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <h3>{props.userData.role ? props.userData.role : "Нет роли"}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <h4>О себе :</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <p>
                {props.userData.info
                  ? props.userData.info
                  : "Я не указал информацию о себе"}
              </p>
            </div>
          </div>
          <div className="row profile_my_team">
            <div className="col-sm">
              <span>
                Моя команда :{" "}
                <Link to={"/team/" + 1} className="team_name">
                  Имя команды
                </Link>
              </span>
            </div>
          </div>
          <div className="row my_projects_ideas">
            <div className="col-sm my_projects">
              <h5>Мои проекты: </h5>
              {pageProfileId == props.currentUserId ? (
                <div className="row my_projects_item">
                  <div className="col-sm">
                    <Link className="new_button" to="/project/create_new">
                      Создать проект
                    </Link>
                  </div>
                </div>
              ) : (
                <span></span>
              )}
              {myProjectsEmlements}
            </div>

            <div className="col-sm my_ideas">
              <div className="row">
                <h5>Мои идеи: </h5>
                {props.currentUserId == pageProfileId ? (
                  <div className="row my_projects_item">
                    <div className="col-sm">
                      <Link className="new_button" to="/project/create_new">
                        Создать идею
                      </Link>
                    </div>
                  </div>
                ) : (
                  <span></span>
                )}
                {myIdeasEmlements}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm redact">
          <div className="row">
            <div className="row my_contacts">
              <div className="col-sm">
                <ul className="profile_contacts_list">
                  <li className="profile_contacts_list_header">
                    Мои контакты :
                  </li>
                  <li>
                    <img src={tg_link} alt="" />{" "}
                    {props.userData.telegram ? (
                      <Link to="#">{props.userData.telegram}</Link>
                    ) : (
                      "Нет телеграмма"
                    )}
                  </li>
                  <li>
                    <img src={vk_link} alt="" />{" "}
                    {props.userData.vk ? (
                      <Link to="#">{props.userData.vk}</Link>
                    ) : (
                      "Нет ВК"
                    )}
                  </li>
                  <li>
                    <img src={git_link} alt="" />{" "}
                    {props.userData.github ? (
                      <Link to="#">{props.userData.github}</Link>
                    ) : (
                      "Нет Гита"
                    )}
                  </li>
                </ul>
              </div>
            </div>
            {props.currentUserId == pageProfileId ? (
              <div className="row invite_block">
                <div className="col-sm">
                  <ul>
                    <li className="invite_block_header">Мои инвайты :</li>
                    {myUnacceptedIdeas}
                  </ul>
                </div>
              </div>
            ) : (
              <span></span>
            )}
            <div className="row">
              <div className="col-sm">
                {props.currentUserId == pageProfileId ? (
                  <Link className="edit_button" to="./profile_editor">
                    Редактировать анкету
                  </Link>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
            {props.currentUserId == pageProfileId && props.isAdmin && (
              <div className="row admin_button">
                <div className="col-sm">
                  <Link className="" to="/admin">
                    Панель администратора
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileContent;
