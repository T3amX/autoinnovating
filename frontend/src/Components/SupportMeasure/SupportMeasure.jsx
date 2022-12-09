import React from "react";
import { Link } from "react-router-dom";
import "./SupportMeasure.scss";

const SupportMeasure = (props) => {
  return (
    <div className="row support-measure">
      <div className="row">
        <div className="col-sm">
          <h1>Меры поддержки</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <p>
            Здесь распологаются всевозможные экономические меры поддержки
            оказываемые администрацией сервиса!
          </p>
        </div>
      </div>
      <div className="row">

        <div className="row align-items-center support-measure-item">
          <div className="col-sm-10">
            <div className="row">
              <h2>Заголовок</h2>
            </div>
            <div className="row">
              <span>
                Тут будет краткое описание меры поддержки (мб вырезка из полного
                описания)
              </span>
            </div>
          </div>
          <div className="col-sm">
            <Link to="#">Подробнее</Link>
          </div>
        </div>

        <div className="row align-items-center support-measure-item">
          <div className="col-sm-10">
            <div className="row">
              <h2>Заголовок</h2>
            </div>
            <div className="row">
              <span>
                Тут будет краткое описание меры поддержки (мб вырезка из полного
                описания)
              </span>
            </div>
          </div>
          <div className="col-sm">
            <Link to="#">Подробнее</Link>
          </div>
        </div>

        <div className="row align-items-center support-measure-item">
          <div className="col-sm-10">
            <div className="row">
              <h2>Заголовок</h2>
            </div>
            <div className="row">
              <span>
                Тут будет краткое описание меры поддержки (мб вырезка из полного
                описания)
              </span>
            </div>
          </div>
          <div className="col-sm">
            <Link to="#">Подробнее</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupportMeasure;
