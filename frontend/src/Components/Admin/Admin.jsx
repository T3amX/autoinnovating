import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

const Admin = (props) => {
  // let filtredUsers = users.filter(u => u.name.includes(input.data))

  // ADD NEW CATEGORY FORM
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // USERS SEARCH FORM
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    formState: { errors: errors2 },
  } = useForm();

  const onSubmit = (data) => {
    props.CreateNewCat(data);
    navigate(`/profile/${props.id}`);
  };

  const onSubmitSearch = (data) => {
    let temp = props.allUsersData.filter((e) =>
      e.login.includes(data.search_query)
    );
    temp = temp.map((u) => {
      return (
        <div key={u.id} className="col-sm-4 site_users_item">
          <div className="site_users_item_info">
            <div className="row">
              <span className="site_users_item_title">{u.login}</span>
            </div>
          </div>
          <div className="row admin_user_menu_bar align-items-center">
            <div className="col-sm-4">
              {!u.is_admin && (
                <span>
                  {u.is_disabled ? (
                    <span onClick={() => banUnban(u)} className="ban_button">
                      Разбанить
                    </span>
                  ) : (
                    <span onClick={() => banUnban(u)} className="ban_button">
                      Выдать бан
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="col-sm-3">
              {!u.is_admin && (
                <span onClick={() => deleteUser(u.id)}>Удалить</span>
              )}
            </div>
            <div className="col-sm make-admin">
              {props.id != u.id && (
                <span>
                  {u.is_admin ? (
                    <span onClick={() => getRemoveAdmin(u)}>
                      Забрать админку
                    </span>
                  ) : (
                    <span onClick={() => getRemoveAdmin(u)}>
                      Сделать админом
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    });
    setSearchQuery(temp);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  let [ban, setBan] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");

  let banUnban = (userData) => {
    if (userData.is_disabled) {
      props.banUnban(userData.id);
    } else {
      props.banUnban(userData.id);
    }
  };

  let getRemoveAdmin = (userData) => {
    if (userData.is_admin) {
      props.updateUsersData(userData.id, { is_admin: false });
    } else {
      props.updateUsersData(userData.id, { is_admin: true });
    }
  };

  let deleteUser = (id) => {
    props.deleteUser(id);
  };

  let navigate = useNavigate();

  if (!props.propsIsLoading) {
    let mapedUsers = props.allUsersData.map((u) => {
      return (
        <div key={u.id} className="col-sm-4 site_users_item">
          <div className="site_users_item_info">
            <div className="row">
              <span className="site_users_item_title">{u.login}</span>
            </div>
          </div>
          <div className="row admin_user_menu_bar align-items-center">
            <div className="col-sm-4">
              {!u.is_admin && (
                <span>
                  {u.is_disabled ? (
                    <span onClick={() => banUnban(u)} className="ban_button">
                      Разбанить
                    </span>
                  ) : (
                    <span onClick={() => banUnban(u)} className="ban_button">
                      Выдать бан
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="col-sm-3">
              {!u.is_admin && (
                <span onClick={() => deleteUser(u.id)}>Удалить</span>
              )}
            </div>
            <div className="col-sm make-admin">
              {props.id != u.id && (
                <span>
                  {u.is_admin ? (
                    <span onClick={() => getRemoveAdmin(u)}>
                      Забрать админку
                    </span>
                  ) : (
                    <span onClick={() => getRemoveAdmin(u)}>
                      Сделать админом
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row admin">
        <div className="row">
          <div className="col-sm">
            <h1>Панель администратора</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <h5>
              Добавить категорию на проект :{" "}
              <input placeholder="Название категории" {...register("name", { required: true })} type="text" />
              <button type="submit">Добавить</button>
            </h5>
          </div>
        </form>

        <div className="row users-search">
          <div className="col-sm">
            <form onSubmit={handleSubmit2(onSubmitSearch)}>
              <h2>
                Пользователи :{" "}
                <input
                  {...register2("search_query", { required: true })}
                  placeholder="Нати пользователя"
                  type="text"
                />
              </h2>
              <button type="submit">Найти</button>
            </form>
            <button onClick={() => clearSearch()}>Сбросить</button>
          </div>
        </div>

        <div className="row site_users">
          {searchQuery == "" ? mapedUsers : searchQuery}
        </div>
      </div>
    );
  }
};

export default Admin;
