import React from "react";
import Project from "./Project/Project";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Projects = ({ currentId, setCurrentId }) => {
  const projects = useSelector((state) => state.projects);
  const classes = useStyles();

  console.log(projects);

  return !projects.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {projects.map((project) => (
        <Grid key={project._id} item xs={12} sm={6}>
          <Project project={project} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Projects;
