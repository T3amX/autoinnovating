import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./ProjectCreate.scss";

const ProjectCreate = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.createNewProject(data);
    navigate("/all_projects/");
  };

  const allCategories = props.categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row project_editor">
        <div className="row">
          <div className="col-sm">
            <h1>Создание нового проекта :</h1>
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
                    {...register("title", {required: true})}
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
                  <span>О проекте:</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <textarea
                    {...register("description", {required: true})}
                    placeholder="Направленность, предпологаемые категории (#it и.т.д)"
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
                  <select {...register("categoryId", {required: true})} className="text_input">
                    {allCategories}
                  </select>
                </div>
              </div>
            </div>

            <div className="row edit_form_item">
              <div className="row">
                <div className="col-sm">
                  <button className="sumbit_profile_form_button" type="submit">
                    Создать
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

export default ProjectCreate;
