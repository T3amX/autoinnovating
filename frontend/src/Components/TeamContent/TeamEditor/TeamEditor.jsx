import React from "react";
import "./TeamEditor.scss";

const TeamEditor = (props) => {
  return (
    <div className="row team_editor">
      <div className="row">
        <div className="col-sm">
          <h1>Редактирование команды : команданейм</h1>
        </div>
      </div>
      <div className="row edit_form">
        <div className="col-sm edit_form_col">
          <div className="row edit_form_item">
            <div className="row">
              <div className="col-sm">
                <span className="">Название* :</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <input
                  placeholder="продуктнейм"
                  className="text_input"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="row edit_form_item">
            <div className="row">
              <div className="col-sm">
                <span>О команде:</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <textarea
                  placeholder="Цели, специализации, прокеты и.т.д"
                  className="textarea_input text_input"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row edit_form_item">
            <div className="row">
              <div className="col-sm">
                <button className="sumbit_profile_form_button" type="submit">
                  Изменить
                </button>
              </div>
            </div>
          </div>

          <div className="row edit_form_item">
            <div className="row">
              <div className="col-sm">
                <span className="span_mini profile_form_desc">
                  символом "*" отмеченны обязательные поля
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamEditor;
