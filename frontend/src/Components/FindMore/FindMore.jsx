import React from "react";
import { Link, useParams } from "react-router-dom";
import "./FindMore.scss";

const FindMore = (props) => {

  let currentProjectId = useParams().id
  console.log(currentProjectId)

  const createInvite = (user_id, idea_id) => {
    props.createInviteThunk(user_id, idea_id)
  }

  if (!props.propsIsLoading) {

    let allUsers = props.usersData.map((d) => {
      return (
        <div className="col-sm-4 result_user_block">
          <div className="row">
            <div className="col-sm">
              <div className="row">
                <span className="login">{d.nickname}</span>
              </div>
              <div className="row">
                <span className="role">{d.role}</span>
              </div>
            </div>
            <div className="col-sm">
              <Link to={"/profile/" + d.id}>Профиль</Link>
            </div>
            <div className="col-sm">
              <button onClick={() => createInvite(d.id, currentProjectId)}>Пригласить</button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row find_more">
        <div className="row">
          <div className="col-sm">
            <h1>Поиск участников в проект :</h1>
          </div>
        </div>

        <div className="row search_bar">
          <div className="col-sm">
            <div className="row">
              <div className="col-sm">
                <span>Никнейм :</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <input type="text" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <span>Компетенция :</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <input type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <button className="search_button">Найти</button>
          </div>
        </div>

        <div className="row search_result">{allUsers}</div>
      </div>
    );
   }
};

export default FindMore;
