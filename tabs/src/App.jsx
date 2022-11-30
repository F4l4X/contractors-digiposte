import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import logo_digiposte from './images/logo_digiposte.png'


import { getContractors } from "./actions/contractors";
import useStyle from './styles'
import Form from './components/Form/Form';
import Contractors from "./components/Contractors/Contractors";
import './index.css';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyle();
  const [datas, setDatas] = useState([]);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getContractors())      
  }, [currentId, dispatch]); 

  return (
    <Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" className={classes.heading} align='center'>Digiposte</Typography>
        <img src={logo_digiposte} className={classes.image} alt="digiposte" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Contractors setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

/*
<Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" className={classes.heading} align='center'>Digiposte</Typography>
        <img src={logo_digiposte} className={classes.image} alt="digiposte" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Contractors />
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
*/

/* <Form currentId={currentId} setCurrentId={setCurrentId}/>*/
export default App;