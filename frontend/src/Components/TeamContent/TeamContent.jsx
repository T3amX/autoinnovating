import React from "react";
import { Link } from "react-router-dom";
import "./TeamContent.scss";

const TeamContent = (props) => {
  return (
    <div className="row team">
      <div className="row">
        <div className="col-sm">
          <h1>Название команды</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <h2>О команде : </h2>
        </div>
      </div>
      <div className="row team_about">
        <div className="col-sm-7">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            praesentium id, in rem ut ipsa quibusdam quia laboriosam repudiandae
            accusantium nihil, maxime nobis molestias. Beatae tempora est
            suscipit ducimus voluptatibus!
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <h3>Участники команды : </h3>
        </div>
      </div>

      <div className="row project_profile">
        <div className="col-sm-3 project_profile_item">
          <div className="row">
            <span className="project_profile_nick">nickname</span>
          </div>
          <div className="row">
            <span className="project_profile_role">back-end разработчик</span>
          </div>
          <div className="row">
            <div className="col-sm">
              <p className="project_profile_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                pretium auctor ligula vel faucibus. Morbi aliquam nunc eros, eu
                fermentum nunc blandit nec. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
          <div className="row">
            <a className="project_profile_button" href="#">
              Профиль
            </a>
          </div>
        </div>

        <div className="col-sm project_profile_item">
          <div className="row">
            <span className="project_profile_nick">nickname</span>
          </div>
          <div className="row">
            <span className="project_profile_role">back-end разработчик</span>
          </div>
          <div className="row">
            <div className="col-sm">
              <p className="project_profile_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                pretium auctor ligula vel faucibus. Morbi aliquam nunc eros, eu
                fermentum nunc blandit nec. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
          <div className="row">
            <a className="project_profile_button" href="#">
              Профиль
            </a>
          </div>
        </div>

        <div className="col-sm project_profile_item">
          <div className="row">
            <span className="project_profile_nick">nickname</span>
          </div>
          <div className="row">
            <span className="project_profile_role">back-end разработчик</span>
          </div>
          <div className="row">
            <div className="col-sm">
              <p className="project_profile_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                pretium auctor ligula vel faucibus. Morbi aliquam nunc eros, eu
                fermentum nunc blandit nec. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
          <div className="row">
            <a className="project_profile_button" href="#">
              Профиль
            </a>
          </div>
        </div>

        <div className="col-sm project_profile_item">
          <div className="row">
            <span className="project_profile_nick">nickname</span>
          </div>
          <div className="row">
            <span className="project_profile_role">back-end разработчик</span>
          </div>
          <div className="row">
            <div className="col-sm">
              <p className="project_profile_desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                pretium auctor ligula vel faucibus. Morbi aliquam nunc eros, eu
                fermentum nunc blandit nec. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
          <div className="row">
            <a className="project_profile_button" href="#">
              Профиль
            </a>
          </div>
        </div>
      </div>

      <div className="row more_action">
        <div className="col-sm">
          <Link to="/find_more">Найти участников</Link>
        </div>
        <div className="col-sm">
          <Link to="./team_editor">Редактировать команду</Link>
        </div>
        <div className="col-sm delete_project">
          <Link to="#">Удалить команду</Link>
        </div>
      </div>
    </div>
  );
};

export default TeamContent;
