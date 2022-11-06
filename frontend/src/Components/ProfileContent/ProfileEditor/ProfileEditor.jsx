import React, { useState } from "react";
import "./ProfileEditor.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ProfileEditor = (props) => {
  let [haveTeam, setHaveTeam] = useState(false);
  let [havePatent, sethavePatent] = useState(false);
  let [haveINN, sethaveINN] = useState(false);

  let [currentProfileInfo, setcurrentProfileInfo] = useState(props.userData);

  const checkObejcts = (propsObject, dataObject) => {
    let tempObj = {};
    if (propsObject.name == dataObject.name || !dataObject.name) {
      tempObj.name = propsObject.name;
    } else {
      tempObj.name = dataObject.name;
    }
    if (propsObject.sex == dataObject.sex || !dataObject.sex) {
      tempObj.sex = propsObject.sex;
    } else {
      tempObj.sex = dataObject.sex;
    }
    if (
      propsObject.birthdate == dataObject.birthdate ||
      !dataObject.birthdate
    ) {
      tempObj.birthdate = propsObject.birthdate;
    } else {
      tempObj.birthdate = dataObject.birthdate;
    }
    if (propsObject.country == dataObject.country || !dataObject.country) {
      tempObj.country = propsObject.country;
    } else {
      tempObj.country = dataObject.country;
    }
    if (propsObject.city == dataObject.city || !dataObject.city) {
      tempObj.city = propsObject.city;
    } else {
      tempObj.city = dataObject.city;
    }
    if (
      propsObject.citizenship == dataObject.citizenship ||
      !dataObject.citizenship
    ) {
      tempObj.citizenship = propsObject.citizenship;
    } else {
      tempObj.citizenship = dataObject.citizenship;
    }
    if (propsObject.telegram == dataObject.telegram || !dataObject.telegram) {
      tempObj.telegram = propsObject.telegram;
    } else {
      tempObj.telegram = dataObject.telegram;
    }
    if (propsObject.github == dataObject.github || !dataObject.github) {
      tempObj.github = propsObject.github;
    } else {
      tempObj.github = dataObject.github;
    }
    if (propsObject.phone == dataObject.phone || !dataObject.phone) {
      tempObj.phone = propsObject.phone;
    } else {
      tempObj.phone = dataObject.phone;
    }
    if (propsObject.vk == dataObject.vk || !dataObject.vk) {
      tempObj.vk = propsObject.vk;
    } else {
      tempObj.vk = dataObject.vk;
    }
    if (propsObject.info == dataObject.info || !dataObject.info) {
      tempObj.info = propsObject.info;
    } else {
      tempObj.info = dataObject.info;
    }
    if (
      propsObject.has_command == dataObject.has_command ||
      !dataObject.has_command
    ) {
      tempObj.has_command = propsObject.has_command;
    } else {
      tempObj.has_command = dataObject.has_command;
    }
    if (propsObject.role == dataObject.role || !dataObject.role) {
      tempObj.role = propsObject.role;
    } else {
      tempObj.role = dataObject.role;
    }
    if (
      propsObject.has_patient == dataObject.has_patient ||
      !dataObject.has_patient
    ) {
      tempObj.has_patient = propsObject.has_patient;
    } else {
      tempObj.has_patient = dataObject.has_patient;
    }
    if (
      propsObject.patient_info == dataObject.patient_info ||
      !dataObject.patient_info
    ) {
      tempObj.patient_info = propsObject.patient_info;
    } else {
      tempObj.patient_info = dataObject.patient_info;
    }
    if (
      propsObject.has_entity == dataObject.has_entity ||
      !dataObject.has_entity
    ) {
      tempObj.has_entity = propsObject.has_entity;
    } else {
      tempObj.has_entity = dataObject.has_entity;
    }
    if (propsObject.inn == dataObject.inn || !dataObject.inn) {
      tempObj.inn = propsObject.inn;
    } else {
      tempObj.inn = dataObject.inn;
    }
    return tempObj;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.updateInfo(props.id, checkObejcts(props.userData, data));
    navigate("/profile/" + props.id);
  };

  const navigate = useNavigate();

  const showRoleField = () => {
    if (haveTeam) {
      setHaveTeam(false);
    } else {
      setHaveTeam(true);
    }
  };

  const showPatentField = () => {
    if (havePatent) {
      sethavePatent(false);
    } else {
      sethavePatent(true);
    }
  };

  const showINNField = () => {
    if (haveINN) {
      sethaveINN(false);
    } else {
      sethaveINN(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row profile_editor">
        <div className="row">
          <div className="col-sm">
            <h1>Редактирование профиля : {props.login}</h1>
          </div>
        </div>
        <div className="row edit_form">
          <div className="col-sm-3 edit_form_col">
            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span className="">ФИО :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("name")}
                    placeholder={currentProfileInfo.name}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span className="">Дата рождения :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("birthdate")}
                    placeholder={currentProfileInfo.birthdate}
                    className="profile_date"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>Страна :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("country")}
                    placeholder={currentProfileInfo.country}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>
                    Город
                    <span className="span_mini">
                      (показывается в профиле)
                    </span>{" "}
                    :
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("city")}
                    placeholder={currentProfileInfo.city}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>Гражданство :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("citizenship")}
                    placeholder={currentProfileInfo.citizenship}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3 edit_form_col">
            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>
                    Пол
                    <span className="span_mini">(показывается в профиле)</span>:
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <select className="text_input" {...register("sex")} name="sex" id="">
                    <option value=""></option>
                    <option value="м">Мужской</option>
                    <option value="ж">Женский</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>
                    Телефон
                    <span className="span_mini">(формат: +7xxxxxxxxxx)</span> :
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("phone", { maxLength: 12, mixnLength: 12 })}
                    placeholder={currentProfileInfo.phone}
                    className="text_input"
                    type="tel"
                    pattern="[+]{1}[0-9]{11,14}"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>Telegram :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("telegram")}
                    placeholder={currentProfileInfo.telegram}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>VK :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("vk")}
                    placeholder={currentProfileInfo.vk}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>Git :</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("github")}
                    placeholder={currentProfileInfo.github}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>О себе:</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <textarea
                    {...register("info")}
                    placeholder={currentProfileInfo.info}
                    className="text_input textarea_input"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>
                    Есть команда на проекте:{" "}
                    <input
                      {...register("has_command")}
                      onClick={() => {
                        showRoleField();
                      }}
                      type="checkbox"
                    />
                  </span>
                </div>
              </div>
            </div>

            {haveTeam ? (
              <div className="row edit_form_item">
                <div className="row">
                  <div className="col-sm">
                    <span>Роль в команде:</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <input
                      {...register("role")}
                      className="text_input"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span></span>
            )}

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>
                    Есть патент:{" "}
                    <input
                      {...register("has_patient")}
                      onClick={() => {
                        showPatentField();
                      }}
                      type="checkbox"
                    />
                  </span>
                </div>
              </div>
            </div>

            {havePatent ? (
              <div className="row edit_form_item">
                <div className="row">
                  <div className="col-sm">
                    <span>Укажите рекивизиты:</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <input
                      {...register("patient_info")}
                      className="text_input"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span></span>
            )}

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>
                    Есть ИНН:{" "}
                    <input
                      {...register("has_entity")}
                      onClick={() => {
                        showINNField();
                      }}
                      type="checkbox"
                    />
                  </span>
                </div>
              </div>
            </div>

            {haveINN ? (
              <div className="row edit_form_item">
                <div className="row">
                  <div className="col-sm">
                    <span>Укажите ИНН:</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <input
                      {...register("inn")}
                      className="text_input"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span></span>
            )}

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <button className="sumbit_profile_form_button" type="submit">
                    Изменить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditor;
