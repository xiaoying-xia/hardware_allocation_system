import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getProjects } from "../../actions/projects";
import Projects from "../Projects/Projects";
import Form from "../Form/Form";
import Availability from "../Availability/Availability";
import { getAvailability } from "../../actions/availability";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects()); // dispatch actions to the Redux store from within a React component
    dispatch(getAvailability());
  }, [dispatch]);
  
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Projects currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid container xs={12} sm={4} spacing={2}>
            <Grid item xs={12} sm={12}>
              <Availability />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
