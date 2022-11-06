import React from "react";
import { Link } from "react-router-dom";
import "./GoToLogin.scss";

const GoToLogin = (props) => {
  return (
    <div className="col-sm-8 go_to_login">
      <div className="row">
        <h1>
          Приветствуем вас <br /> на нашей платформе!
        </h1>
      </div>
      {props.isAuth ? (
        <span></span>
      ) : (
        <div className="row">
          <div className="row">
            <span>
              Для получения доступа к основным <br /> функциям -
              войдите/зарегистрируйтесь{" "}
            </span>
          </div>
          <div className="row">
            <Link to="/login" className="login_button">
              Вход
            </Link>
            <Link to='/register'>Регистрация</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoToLogin;
