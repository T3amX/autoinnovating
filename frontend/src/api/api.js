
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.APP_URL,
});

export const authAPI = {
  registration({ email, login, password }) {
    return instance.post("/api/v1/auth", { email, login, password });
  },

  login({ login, password }) {
    return instance.post("/api/v1/auth/login", { login, password });
  },

  setLoginData(authInterceptor) {
    return instance.interceptors.request.use(authInterceptor);
  },

  getUserData(id) {
    return instance.get("/api/v1/auth/" + id);
  },

  getAllUsers() {
    return instance.get("/api/v1/auth");
  },

  updateUsersData(userId, newData) {
    return instance.put("/api/v1/auth/" + userId, newData);
  },

  banunbanUser(id) {
    return instance.post("/api/v1/auth/toggle_ban/" + id);
  },

  deleteUser(userId) {
    return instance.delete("/api/v1/auth/" + userId);
  },
};

export const userAPI = {
  getAllUserData(id) {
    return instance.get("/api/v1/user_data/");
  },

  getData(id) {
    return instance.get("/api/v1/user_data/" + id);
  },

  updateProfileInfo(id, profileInfo) {
    return instance.put("/api/v1/user_data/" + id, profileInfo);
  },

  getUserForSearch() {
    return instance.get("/api/v1/user_data/search");
  },
};

export const projectsAPI = {
  getAllProjects() {
    return instance.get("/api/v1/ideas/");
    // return instance.get("/api/v1/ideas/?limit=" + limit + "&offset=" + offset);
  },

  getSingleProject(id) {
    return instance.get("/api/v1/ideas/" + id);
  },

  createNewProject(newProject) {
    return instance.post("api/v1/ideas", newProject);
  },

  getAllCategories() {
    return instance.get("/api/v1/categories");
  },

  getAllProjectParticipants(id) {
    return instance.get("/api/v1/ideas/participants/" + id);
  },

  updateCurrentProject(projectId, newProjectData) {
    console.log(projectId, newProjectData);
    return instance.put("/api/v1/ideas/" + projectId, newProjectData);
  },

  deleteCurrentProject(id) {
    return instance.delete("/api/v1/ideas/" + id);
  },

  createNewCategories(text) {
    return instance.post("/api/v1/categories", text);
  },
};

export const ideasAPI = {
  getUnacceptedIdeas() {
    return instance.get("/api/v1/invites")
  },

  acceptUnacceptedIdea(idea_id) {
    return instance.put("/api/v1/invites", {idea_id})
  },

  createInvite(user_id,idea_id) {
    return instance.post("/api/v1/invites", {user_id, idea_id})
  },

  deleteInvite(idea_id,credential_id) {
    return instance.delete("/api/v1/invites", {headers: {}, data: {idea_id, credential_id}} )
  }

}

// export const inviteAPI = {

// }
