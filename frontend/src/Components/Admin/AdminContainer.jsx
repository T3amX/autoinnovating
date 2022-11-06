import React, { useState } from "react";
import Admin from "./Admin";
import { connect } from "react-redux";
import { compose } from "redux";
import { useEffect } from "react";
import {
  banunbanUserThunk,
  deleteUserThunk,
  getAllUsersThunk,
  updateUsersDataThunk,
} from "../../store/authReducer";
import { createNewCategoriesThunk } from "../../store/ProjectReducer";

const AdminContainer = (props) => {
  // СМЕНИТЬ НА TRUE
  let [propsIsLoading, setPropsIsLoading] = useState(true);

  useEffect(() => {
    props.getAllUsersThunk().then(() => {
      setPropsIsLoading(false);
    });
  }, []);
  return (
    <Admin
      CreateNewCat={props.createNewCategoriesThunk}
      isAuth={props.id}
      id={props.id}
      banTrigger={props.banTrigger}
      banUnban={props.banunbanUserThunk}
      deleteUser={props.deleteUserThunk}
      updateUsersData={props.updateUsersDataThunk}
      allUsersData={props.allUsersData}
      propsIsLoading={propsIsLoading}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    id: state.auth.id,
    allUsersData: state.auth.allUsersData,
    banTrigger: state.auth.banTrigger,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, {
    getAllUsersThunk,
    updateUsersDataThunk,
    deleteUserThunk,
    banunbanUserThunk,
    createNewCategoriesThunk,
  })
)(AdminContainer);
