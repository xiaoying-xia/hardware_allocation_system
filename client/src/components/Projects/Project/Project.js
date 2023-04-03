import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../../actions/projects";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { join, leave } from "../../../actions/auth";
import { setAvailability } from "../../../actions/availability";

const Project = ({ project, currentId, setCurrentId }) => {
  const Availability = useSelector((state) => state.availability);

  const [hw1, setHw1] = useState(0); // availability of hw1
  const [hw2, setHw2] = useState(0);
  const [avail, setAvail] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [inProj, setInProj] = useState(
    user?.result.inProject.includes(project._id)
  );

  useEffect(() => {
    setHw1(Availability[0]?.availability);
    setHw2(Availability[1]?.availability);
    setAvail(Availability);
  }, [Availability]);

  const [projectData, setProjectData] = useState({
    ...project,
  });

  useEffect(() => {
    setProjectData({ ...project });
  }, [project]);

  const [text1, setText1] = useState(0);

  const [text2, setText2] = useState(0);

  const classes = useStyles();

  const dispatch = useDispatch(); // dispatch the project request

  // const handleCheckIn = (e) => {
  //   e.preventDefault(); // prevent refresh

  //   if (text1 !== 0 || text2 !== 0) {
  //     setProjectData({
  //       ...projectData,
  //       hw1Count: parseInt(projectData.hw1Count) + parseInt(text1),
  //       hw2Count: parseInt(projectData.hw2Count) + parseInt(text2),
  //     });
  //   }
  // };

  const handleCheckIn = (e) => {
    e.preventDefault(); // prevent refresh

    if (text1 > hw1 || text2 > hw2) {
      alert("Invalid Amount!");
      return;
    }

    if (text1 !== 0 || text2 !== 0) {
      setProjectData((data) => {
        const tmp = { ...data };
        tmp.hw1Count = parseInt(tmp.hw1Count) + parseInt(text1);
        tmp.hw2Count = parseInt(tmp.hw2Count) + parseInt(text2);
        // console.log(tmp.hw1Count);
        if (tmp && tmp._id) {
          // dispatch(setAvailability()); // to be filled
          dispatch(updateProject(tmp._id, tmp));
        }
        return tmp;
      });
      setAvail((avail) => {
        const tmp = [...avail];
        const hw1 = { ...tmp[0] };
        const hw2 = { ...tmp[1] };
        hw1.availability = parseInt(tmp[0]?.availability) - parseInt(text1);
        hw2.availability = parseInt(tmp[1]?.availability) - parseInt(text2);
        tmp[0] = hw1;
        tmp[1] = hw2;

        dispatch(setAvailability(tmp));
        return tmp;
      });
    }
  };

  const handleCheckOut = (e) => {
    e.preventDefault(); // prevent refresh
    if (
      projectData.hw1Count - parseInt(text1) < 0 ||
      projectData.hw2Count - parseInt(text2) < 0
    ) {
      alert("Invalid Amount!");
      return;
    }

    if (text1 !== 0 || text2 !== 0) {
      setProjectData((data) => {
        const tmp = { ...data };
        tmp.hw1Count = parseInt(tmp.hw1Count) - parseInt(text1);
        tmp.hw2Count = parseInt(tmp.hw2Count) - parseInt(text2);
        // console.log(tmp.hw1Count);
        if (tmp && tmp._id) {
          dispatch(updateProject(tmp._id, tmp));
        }
        return tmp;
      });

      setAvail((avail) => {
        const tmp = [...avail];
        const hw1 = { ...tmp[0] };
        const hw2 = { ...tmp[1] };
        hw1.availability = parseInt(tmp[0]?.availability) + parseInt(text1);
        hw2.availability = parseInt(tmp[1]?.availability) + parseInt(text2);
        tmp[0] = hw1;
        tmp[1] = hw2;

        dispatch(setAvailability(tmp));
        return tmp;
      });
    }
  };

  const handleJoin = () => {
    setUser((user) => {
      const tmpRes = { ...user.result };
      const tmpInProj = tmpRes.inProject;
      tmpInProj.push(project._id);
      // console.log(tmpInProj);
      tmpRes.inProject = tmpInProj;
      const newUser = { ...user, result: tmpRes };
      // console.log(newUser.result.inProject);
      // console.log(project._id);
      dispatch(join(project._id));
      return newUser; // just for re-render
    });
    setInProj((prevInProj) => {
      return !prevInProj;
    });
  };

  const handleLeave = () => {
    setUser((user) => {
      const tmpRes = { ...user.result };
      const tmpInProj = tmpRes.inProject.filter((id) => id !== project._id);
      // console.log(tmpInProj);
      tmpRes.inProject = tmpInProj;
      const newUser = { ...user, result: tmpRes };
      // console.log(newUser.result.inProject);
      dispatch(leave(project._id));
      return newUser; // just for re-render
    });
    setInProj((prevInProj) => {
      return !prevInProj;
    });
  };

  const renderJoinButton = () => {
    if (!user) return <></>;
    if (inProj) {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleLeave}
        >
          Leave
        </Button>
      );
    } else
      return (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={handleJoin}
        >
          Join
        </Button>
      );
  };

  const renderCheckInButton = () => {
    if (inProj) {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCheckIn}
        >
          Check in
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCheckIn}
          disabled
        >
          Check in
        </Button>
      );
    }
  };

  const renderCheckOutButton = () => {
    if (inProj) {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCheckOut}
        >
          Check out
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCheckOut}
          disabled
        >
          Check out
        </Button>
      );
    }
  };

  const renderEditButton = () => {
    if (!user) {
      return <></>;
    } else
      return (
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(project._id)}
        >
          <MoreHorizIcon fontSize="default"></MoreHorizIcon>
        </Button>
      );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={project.selectedFile}
        title={project.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{project.projectName}</Typography>
        <Typography variant="body2">{project.description}</Typography>
      </div>
      <div className={classes.overlay2}>{renderEditButton()}</div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {project.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>

      <CardContent>
        <Grid container direction="column">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="h6">HW1</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" style={{ width: "95px" }}>
                Usage: {project.hw1Count}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="qty"
                variant="outlined"
                size="small"
                style={{ width: 50 }}
                onChange={(e) => setText1(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="h6">HW2</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" style={{ width: "95px" }}>
                Usage: {project.hw2Count}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="qty"
                variant="outlined"
                size="small"
                style={{ width: 50 }}
                onChange={(e) => setText2(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions className={classes.cardActions}>
        {renderCheckInButton()}
        {renderCheckOutButton()}
        {renderJoinButton()}
      </CardActions>
    </Card>
  );
};

export default Project;
