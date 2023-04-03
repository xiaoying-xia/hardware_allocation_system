import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchProjects = () => API.get("/projects");
export const createProject = (newProject) => API.post("/projects", newProject);
export const updateProject = (id, updatedProject) =>
  API.patch(`/projects/${id}`, updatedProject);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const join = (id) => API.post(`/user/join`, id);
export const leave = (id) => API.post(`/user/leave`, id);

export const getAvailability = () => API.get(`/availability`);
export const setAvailability = (newAvail) =>
  API.post(`/availability`, newAvail);
