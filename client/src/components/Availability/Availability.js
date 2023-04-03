import { Typography, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Availability = () => {
  const classes = useStyles();
  const Availability = useSelector((state) => state.availability);

  const [hw1, setHw1] = useState(0);
  const [hw2, setHw2] = useState(0);

  useEffect(()=> {setHw1(Availability[0]?.availability)}, [Availability]);
  useEffect(()=> {setHw2(Availability[1]?.availability)}, [Availability]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Current Availability:
      </Typography>
      <Typography variant="h6" align="center">
        HW Set 1: {hw1}
      </Typography>
      <Typography variant="h6" align="center">
        HW Set 2: {hw2}
      </Typography>
      {/* <button onClick={() => console.log(10)}>Click</button> */}
    </Paper>
  );
};

export default Availability;
