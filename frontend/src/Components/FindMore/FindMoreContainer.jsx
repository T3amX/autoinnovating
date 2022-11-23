import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createInviteThunk } from "../../store/authReducer";
import { getAllUserDataThunk, getUserForSearchThunk, setUserDataThunk } from "../../store/userReducer";
import FindMore from "./FindMore";

const FindMoreContainer = (props) => {
  let [propsIsLoading, setPropsIsLoading] = useState(true);

  useEffect(() => {
    props.getUserForSearchThunk().then(() => {
      setPropsIsLoading(false);
    });
  }, []);

  return (
    <FindMore createInviteThunk={props.createInviteThunk} usersData={props.usersData} propsIsLoading={propsIsLoading} />
  );
};

let mapStateToProps = (state) => {
  return {
    usersData: state.user.usersData,
  };
};


export default compose(
  connect(mapStateToProps, { setUserDataThunk, getUserForSearchThunk, createInviteThunk })
)(FindMoreContainer);
