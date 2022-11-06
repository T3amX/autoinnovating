import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = (props) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    props.registerData(data);
    navigate("/login");
  };

  const navigate = useNavigate();

  return (
    <div className="row login_page">
      <div className="col-sm">
        <div className="row">
          <h1>Регистрация</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row login_field">
            <div className="row">
              <h2>Email:</h2>
            </div>
            <div className="row">
              <input
                {...register("email", {
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                type="text"
              />
            </div>
          </div>
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
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
              />
            </div>
          </div>
          <div className="row login_field">
            <button type="submit">Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
