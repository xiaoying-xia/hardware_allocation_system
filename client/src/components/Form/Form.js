import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createProject, updateProject } from "../../actions/projects";

const Form = ({ currentId, setCurrentId }) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    creator: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  // get the return value of the reducer
  // in this case, the the reducer returns the updated projects
  // we want to get the updated project
  const project = useSelector((state) =>
    currentId ? state.projects.find((p) => p._id === currentId) : null
  );

  const classes = useStyles();

  const dispatch = useDispatch(); // dispatch the project request

  // when the project changes, call the function which is the first parameter
  useEffect(() => {
    if (project) setProjectData(project);
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent refresh

    if (currentId) {
      // if getting here by update
      dispatch(updateProject(currentId, projectData));
    } else {
      dispatch(createProject(projectData));
    }
  };

  const clear = () => {
    setProjectData({
      projectName: "",
      description: "",
      creator: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please log in to create new project.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Create new project</Typography>
        <TextField
          name="projectName"
          variant="outlined"
          label="Project Name"
          fullWidth
          value={projectData.projectName}
          onChange={(e) =>
            setProjectData({ ...projectData, projectName: e.target.value })
          }
        ></TextField>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={projectData.creator}
          onChange={(e) =>
            setProjectData({ ...projectData, creator: e.target.value })
          }
        ></TextField>
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={projectData.description}
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={projectData.tags}
          onChange={(e) =>
            setProjectData({ ...projectData, tags: e.target.value })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple="false"
            onDone={({ base64 }) =>
              setProjectData({ ...projectData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
