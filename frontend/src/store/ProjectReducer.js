import { authAPI, projectsAPI } from "../api/api";

const GET_ALL_CATEGORIES = "AutoInnovating/projects/GET_USER_DATA";
const GET_ALL_PROJECTS = "AutoInnovating/projects/GET_ALL_PROJECTS";
const GET_SINGLE_PROJECT = "AutoInnovating/projects/GET_SINGLE_PROJECT";
const GET_ALL_PARTICIPANTS = "AutoInnovating/projects/GET_ALL_PARTICIPANTS";

let initialState = {
  categories: [],
  projects: [],
  participants: [],
  totalProjectsCount: 36,
  offset: 1,
  limit: 6,
  currentProject: null,
  unacceptedProjects: [],
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES: {
      return {
        ...state,
        categories: [...action.allCategories],
      };
    }
    case GET_ALL_PROJECTS: {
      return {
        ...state,
        projects: [...action.allProjects],
      };
    }
    case GET_SINGLE_PROJECT: {
      let temp = state.unacceptedProjects.concat(action.idea)

      return {
        ...state,
        currentProject: { ...action.idea },
        unacceptedProjects: [...temp],
      };
    }
    case GET_ALL_PARTICIPANTS: {
      return {
        ...state,
        participants: [...action.lines],
      };
    }
    default:
      return state;
  }
};

// AC's
export const getAllCategoriesAction = (allCategories) => {
  return {
    type: GET_ALL_CATEGORIES,
    allCategories,
  };
};

export const getAllProjectsAction = (allProjects) => {
  return {
    type: GET_ALL_PROJECTS,
    allProjects,
  };
};

export const getSingleProjectAction = (idea) => {
  return {
    type: GET_SINGLE_PROJECT,
    idea,
  };
};

export const getAllProjectParticipantsAction = (lines) => {
  return {
    type: GET_ALL_PARTICIPANTS,
    lines,
  };
};

// THUNKS
export const createNewProjectThunk = (newProject) => {
  return async (dispatch) => {
    let response = await projectsAPI.createNewProject(newProject);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
  };
};

export const getAllCategoriesThunk = () => {
  return async (dispatch) => {
    let response = await projectsAPI.getAllCategories();

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);


    dispatch(getAllCategoriesAction(response.data.lines));
  };
};

export const getAllProjectsThunk = () => {
  return async (dispatch) => {
    let response = await projectsAPI.getAllProjects();

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);

    dispatch(getAllProjectsAction(response.data.lines));
  };
};

export const getSingleProjectThunk = (id) => {
  return async (dispatch) => {
    let response = await projectsAPI.getSingleProject(id);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
    dispatch(getSingleProjectAction(response.data.idea));
  };
};

export const getAllProjectParticipantsThunk = (id) => {
  return async (dispatch) => {
    let response = await projectsAPI.getAllProjectParticipants(id);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
    dispatch(getAllProjectParticipantsAction(response.data.lines));
  };
};

export const updateCurrentProjectThunk = (projectId, newProjectData) => {
  return async (dispatch) => {
    let response = await projectsAPI.updateCurrentProject(
      projectId,
      newProjectData
    );

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);

  };
};

export const deleteCurrentProjectThunk = (projectId) => {
  return async (dispatch) => {
    let response = await projectsAPI.deleteCurrentProject(projectId);

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
  };
};

export const createNewCategoriesThunk = (text) => {
  return async (dispatch) => {
    let response = await projectsAPI.createNewCategories(text);
    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${response.data.token}`;
      return config;
    };
    let authResponse = await authAPI.setLoginData(authInterceptor);
  };
};

export default projectsReducer;
