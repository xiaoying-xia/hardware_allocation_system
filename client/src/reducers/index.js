import { combineReducers } from "redux";

import projects from "./projects";
import auth from "./auth";
import availability from "./availability";

export default combineReducers({ projects: projects, auth: auth, availability: availability });
