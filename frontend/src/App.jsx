import { Link, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

// STYLES
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// COMPONENTS
import Footer from "./Components/Footer/Footer";
import AboutContent from "./Components/AboutContent/AboutContent";
import LoginContainer from "./Components/Login/LoginContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import RegisterContainer from "./Components/Register/RegisterContainer";
import TeamContent from "./Components/TeamContent/TeamContent";
import TeamEditor from "./Components/TeamContent/TeamEditor/TeamEditor";
import ProfileContentContainer from "./Components/ProfileContent/ProfileContentContainer";
import ProfileEditorContainer from "./Components/ProfileContent/ProfileEditor/ProfileEditorContainer";
import ProjectEditorContainer from "./Components/ProjectContent/ProjectEditor/ProjectEditorContainer";
import AllProjectsContentContainer from "./Components/AllProjectsContent/AllProjectsContentContainer";
import ProjectCreateContainer from "./Components/ProjectContent/ProjectCreate/ProjectCreateContainer";
import ProjectContentContainer from "./Components/ProjectContent/ProjectContentContainer";
import AdminContainer from "./Components/Admin/AdminContainer";
import FindMoreContainer from "./Components/FindMore/FindMoreContainer";
import SupportMeasure from "./Components/SupportMeasure/SupportMeasure";

// HOOKS

// ASSETS

const App = (props) => {
  let [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark')
    }

    if (localStorage.getItem("token")) {
      props.setAuthThunk().then(() => {
        setIsFetching(false);
      });
    } else {
      setIsFetching(false);
    }
  }, []);

  if (isFetching == false) {
    return (
      <div className="app">
        <div className="container-fluid">
          <div className="container">
            <HeaderContainer />
            <Routes>
              <Route path="/support_measure" element={<SupportMeasure />} />
              <Route path="/" element={<AboutContent />} />
              <Route path="login" element={<LoginContainer />} />
              <Route path="register" element={<RegisterContainer />} />
              <Route path="project/:id" element={<ProjectContentContainer />} />
              <Route
                path="project/:id/project_editor"
                element={<ProjectEditorContainer />}
              />
              <Route
                path="project/:id/find_more"
                element={<FindMoreContainer />}
              />
              <Route path="team/:id" element={<TeamContent />} />
              <Route path="team/:id/team_editor" element={<TeamEditor />} />
              <Route path="profile/:id" element={<ProfileContentContainer />} />
              <Route
                path="profile/:id/profile_editor"
                element={<ProfileEditorContainer />}
              />
              <Route
                path="all_projects"
                element={<AllProjectsContentContainer />}
              />
              <Route
                path="project/create_new"
                element={<ProjectCreateContainer />}
              />
              <Route path="admin" element={<AdminContainer />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
