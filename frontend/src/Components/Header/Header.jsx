import React from "react";
import { Link } from "react-router-dom";

// STYLES
import "./Header.scss";

// ASSETS
import logo_night from "./../../assets/img/logo_night.png";
import logo_day from "./../../assets/img/logo_day.png";
import theme_switcher_dark from "./../../assets/img/lighter_night.png";
import theme_switcher_light from "./../../assets/img/lighter_day.png";

// HOOKS
import { useTheme } from "../../hooks/useTheme";

const Header = (props) => {
  // THEME HANDLERS
  const { theme = localStorage.getItem('theme'), setTheme } = useTheme();
  const handleLightThemeClick = () => {
    setTheme("light");
    localStorage.setItem('theme', 'light')
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
    localStorage.setItem('theme', 'dark')
  };

  if (!props.propsIsLoading) {
    return (
      <div className="row align-items-center header">
        <div className="col-sm">
          {localStorage.getItem('theme') == 'dark' ? <Link to="/">
            <img src={logo_night} alt="Team Logo" />
          </Link> : <Link to="/">
            <img src={logo_day} alt="Team Logo" />
          </Link>}
          
        </div>
        <div className="col-sm-8 menu_links">
          <Link to="#">Новости</Link>
          {/* <Link to="kva">Лента</Link> */}
          {props.isAuth && <Link to={"/all_projects/"}>Все проекты</Link>}

          {/* <a href="#">Идеи</a> */}
        </div>

        <div className="col-sm">
          {theme == "dark" ? (
            <img
              onClick={handleLightThemeClick}
              className="theme-handler"
              src={theme_switcher_light}
            ></img>
          ) : (
            <img
              onClick={handleDarkThemeClick}
              className="theme-handler"
              src={theme_switcher_dark}
            ></img>
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
