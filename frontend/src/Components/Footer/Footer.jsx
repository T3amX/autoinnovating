import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

// ASSETS
import ru from "./../../assets/img/ru.png";
import { useState } from "react";

const Footer = (props) => {
  let [currentLang, setCurrentLang] = useState("ru");

  return (
    <div className="container-fluid footer">
      <div className="container">
        <div className="row align-items-center footer_content">
          <div className="col-sm-9">
            <Link to="/">Главная</Link>
            <a href="#">Лента</a>
            <a href="#">Помощь</a>
            <a href="#">Обратная связь</a>
            <Link to='/support_measure'>Меры поддержки</Link>
          </div>
          <div className="col-sm language">
            <span>
              Язык :{" "}
              {currentLang == "ru" ? (
                <button onClick={() => setCurrentLang("no")}>
                  <img src={ru} alt="" /> Русский{" "}
                  <span className="footer_arrow_down">˅</span>
                </button>
              ) : (
                <span>Языков пока нет ^_^</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
