import React from "react";

// STYLES
import "./Header.scss";

// ASSETS
import pageLogo from "./../../assets/img/logo1.png";
import tsd from "./../../assets/img/theme_switcher_dark.png";
import tsl from "./../../assets/img/theme_switcher_light.png";

// HOOKS
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

const Header = (props) => {
  // THEME HANDLERS
  const { theme, setTheme } = useTheme();
  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  if (!props.propsIsLoading) {
    return (
      <div className="row align-items-center header">
        <div className="col-sm">
          <Link to="/">
            <img src={pageLogo} alt="Team Logo" />
          </Link>
        </div>
        <div className="col-sm-8 menu_links">
          <Link to="/">О нас</Link>
          {/* <Link to="kva">Лента</Link> */}
          <Link to={"/all_projects/"}>Все проекты</Link>
          {/* <a href="#">Идеи</a> */}
          {props.isAuth ? (
            <span>
              {/* <Link to={"/project/" + 1}>Мой проект</Link> */}
              <Link to={"/team/" + 1}>Моя команда</Link>
            </span>
          ) : (
            <span></span>
          )}
        </div>
       
        <div className="col-sm-2 login">
          {props.isAuth ? (
            <span>
              <Link to={"/profile/" + props.id}>Профиль</Link> |{" "}
              <span className="logout" onClick={() => props.letLogout()}>
                Выход
              </span>
            </span>
          ) : (
            <span>
              <Link to="/login">Вход</Link> |{" "}
              <Link to="/register">Регистрация</Link>
            </span>
          )}
        </div>
      </div>
    );
  }
};

export default Header;
