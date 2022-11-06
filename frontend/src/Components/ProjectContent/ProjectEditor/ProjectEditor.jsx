import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./ProjectEditor.scss";

const ProjectEditor = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checkObejcts = (propsObject, dataObject) => {
    let tempObj = {};
    if (propsObject.title == dataObject.title || !dataObject.title) {
      tempObj.title = propsObject.title;
    } else {
      tempObj.title = dataObject.title;
    }
    if (propsObject.description == dataObject.description || !dataObject.description) {
      tempObj.description = propsObject.description;
    } else {
      tempObj.description = dataObject.description;
    }
    if (propsObject.categoryId == dataObject.categoryId || !dataObject.categoryId) {
      tempObj.categoryId = propsObject.categoryId;
    } else {
      tempObj.categoryId = dataObject.categoryId;
    }
    return tempObj;
  };

  const onSubmit = (data) => {
    props.updateCurrentProjectThunk(props.localProjectId, checkObejcts(props.currentProject, data))
    navigate("/project/" + props.localProjectId);
  };

  const navigate = useNavigate();

  const allCategories = props.categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row project_editor">
        <div className="row">
          <div className="col-sm">
            <h1>Редактирование проекта : проектнейм</h1>
          </div>
        </div>
        <div className="row edit_form">
          <div className="col-sm edit_form_col">
            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span className="">Название:</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <input
                    {...register("title")}
                    placeholder={props.currentProject.title}
                    className="text_input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>О проекте:</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <textarea
                    {...register("description")}
                    placeholder={props.currentProject.description}
                    className="text_input textarea_input"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <span>Категория:</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <select {...register("categoryId")}  className="text_input">
                    <option value=""></option>
                    {allCategories}
                  </select>
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectEditor;
