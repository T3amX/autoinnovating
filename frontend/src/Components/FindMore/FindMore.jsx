import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import "./FindMore.scss";
const FindMore = (props) => {
  var _ = require("lodash");
  let currentProjectId = useParams().id;

  const createInvite = (user_id, idea_id) => {
    props.createInviteThunk(user_id, idea_id);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
  };

  let uniqRoles;

  useEffect(() => {
    uniqRoles = _.uniq(props.usersData.map((e) => e.role));
    delete uniqRoles[uniqRoles.indexOf(null)];
    uniqRoles = uniqRoles.map((e) => {
      return <option value={e}></option>;
    });
    console.log(uniqRoles)
  }, []);

  const onSubmitSearch = (data) => {
    // let role = data.role == '' ? null : data.role
    let temp;
    if (data.nickname == "" && data.role != "") {
      temp = props.usersData.filter(
        (e) => e.role != null && e.role.includes(data.role.toLowerCase())
      );
    }
    if (data.role == "") {
      temp = props.usersData.filter(
        (e) =>
          e.nickname.toLowerCase().includes(data.nickname.toLowerCase()) &&
          (e.role || e.role == null)
      );
    } else {
      temp = props.usersData.filter(
        (e) =>
          e.nickname.toLowerCase().includes(data.nickname.toLowerCase()) &&
          e.role != null &&
          e.role.includes(data.role)
      );
    }

    temp = temp.map((d) => {
      return (
        <div className="col-sm-4 result_user_block">
          <div className="row align-items-center">
            <div className="col-sm">
              <div className="row">
                <span className="login">{d.nickname}</span>
              </div>
              <div className="row">
                <span className="role">
                  {d.role ? d.role : "Роль не указана"}
                </span>
              </div>
            </div>
            <div className="col-sm">
              <Link to={"/profile/" + d.id}>Профиль</Link>
            </div>
            <div className="col-sm">
              <button onClick={() => createInvite(d.id, currentProjectId)}>
                Пригласить
              </button>
            </div>
          </div>
        </div>
      );
    });
    setSearchQuery(temp);
  };

  if (!props.propsIsLoading) {
    let allUsers = props.usersData.map((d) => {
      return (
        <div className="col-sm-4 result_user_block">
          <div className="row align-items-center">
            <div className="col-sm">
              <div className="row">
                <span className="login">{d.nickname}</span>
              </div>
              <div className="row">
                <span className="role">
                  {d.role ? d.role : "Роль не указана"}
                </span>
              </div>
            </div>
            <div className="col-sm">
              <Link to={"/profile/" + d.id}>Профиль</Link>
            </div>
            <div className="col-sm">
              <button onClick={() => createInvite(d.id, currentProjectId)}>
                Пригласить
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row find_more">
        <div className="row">
          <div className="col-sm">
            <h1>Поиск участников в проект : </h1>
            <span className="project-title">{props.currentProject.title}</span>
          </div>
        </div>

        <div className="row search_bar">
          <div className="col-sm">
            <form
              className="search_bar_field"
              onSubmit={handleSubmit(onSubmitSearch)}
            >
              <div className="row ">
                <div className="col-sm">
                  <span>Никнейм :</span>
                </div>
              </div>
              <div className="row ">
                <div className="col-sm">
                  <input {...register("nickname")} type="text" />
                </div>
              </div>
              <div className="row ">
                <div className="col-sm">
                  <span>Компетенция :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input list="roles" {...register("role")} type="text" />
                  <datalist id="roles">
                    {uniqRoles}
                  </datalist>
                </div>
              </div>
              <div className="row search_bar_field">
                <div className="col-sm">
                  <button type="submit" className="search_button">
                    Найти
                  </button>
                </div>
              </div>
            </form>
            <div className="row search_bar_field">
              <div className="col-sm">
                <button onClick={() => clearSearch()} className="search_button">
                  Сбросить
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row search_result">
          {searchQuery == "" ? allUsers : searchQuery}
        </div>
      </div>
    );
  }
};

export default FindMore;
