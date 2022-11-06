import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.scss";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.setAuth(data);
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <div className="row login_page">
      <div className="col-sm">
        <div className="row">
          <h1>Вход</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row login_field">
            <div className="row">
              <h2>Логин:</h2>
            </div>
            <div className="row">
              <input {...register("login", { required: true })} type="text" />
            </div>
          </div>
          <div className="row login_field">
            <div className="row">
              <h2>Пароль:</h2>
            </div>
            <div className="row">
              <input {...register("password", { required: true })} type="password" />
            </div>
          </div>
          <div className="row login_field">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
