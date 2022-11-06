import React from "react";

// STYLES
import "./AboutContent.scss";


// COMPONENTS
import GoToLoginContainer from "./GoToLogin/GoToLoginContainer";
import AboutSide from "./AboutSide/AboutSide";


const AboutContent = (props) => {

  return (
    <div className="row about_content">
      <GoToLoginContainer />
      <AboutSide />
    </div>
  );
};

export default AboutContent;
