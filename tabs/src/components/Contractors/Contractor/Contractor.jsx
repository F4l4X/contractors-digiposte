import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Container} from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { updateContractor } from '../../../actions/contractors'
import 'react-circular-progressbar/dist/styles.css';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box';


import { deleteContractor } from "../../../actions/contractors";


const Contractor = ({ contractor, setCurrentId, currentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [contractorSoft, setContractorSoft] = useState({
      done: ''
    })

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setCurrentId(contractor._id)
    };
  
    const applyChanges = (e) => {
      handleClick()
      setCurrentId('')
      
    }

    useEffect(() => {
      if(contractor) {
          setContractorSoft(contractor); 
      }
    }, [contractor])


    const handleToggle = c => () => {
      // return the first index or -1
      const clickedCategory = checked.indexOf(c);
      const all = [...checked];

      if (clickedCategory === -1) {
      all.push(c);
      } else {
      all.splice(clickedCategory, 1);
      }
      console.log(all);
      setChecked(all);
      setContractorSoft({...contractorSoft, done: all})
  };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const showSoftwares = () => {
      return contractor.softwares.map((item, index) => (
        <li key={index}>
          <input type="checkbox" defaultChecked={contractor.done.includes(item)} onChange={handleToggle(item)}></input>
          <label>{item}</label>
        </li>
      ))
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateContractor(contractor._id, contractorSoft));
      applyChanges()
    };

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={contractor.picture || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={contractor.position}/>
        <div className={classes.overlay}>
          <Typography variant="h6">{contractor.firstname}</Typography>
          <Typography variant="h5">{contractor.lastname}</Typography>
          <Typography variant="h6">{contractor.position}</Typography>
        </div>
        <div className={classes.details}>
        <Typography variant="body2">Head: {contractor.head}</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="secondary">Softwares: {contractor.softwares}</Typography>
        </div>
        <div className={classes.details}>
        <Typography variant="body2">VPN: {contractor.vpn}</Typography>
        </div>
        <div className={classes.floatContainer}>
          <div className={classes.floatChild}>
            <Typography variant="body2">Accredidation status :</Typography>
          </div>
          <div className={classes.floatChild}>
          <Button aria-describedby={id} type="button" onClick={handleClick}>
            <CircularProgressbar value={(((contractor.done).length)/((contractor.softwares).length))*100} text={`${((((contractor.done).length)/((contractor.softwares).length))*100).toFixed()}%`}/>
          </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} setP>
              <Box className={classes.box}>
                <form onSubmit={handleSubmit}>
                  <ul style={{listStyle: "none"}}>
                    {showSoftwares()}
                  </ul>
                  <Button type="submit">Save</Button>
                </form>
              </Box>
            </Popper>
          </div>
        </div>
        <div className={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(contractor._id)}>
            <MoreHorizIcon fontSize="medium"/>
          </Button>
        </div>
        <div className={classes.details}> 
          <Typography variant="body2" color="primary">Begin Mission: {moment(contractor.beginMission).calendar()}</Typography>
          <Typography variant="body2" color="primary">End Mission: {moment(contractor.endMission).calendar()}</Typography>
        </div>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(deleteContractor(contractor._id))}>
            <DeleteIcon fontSize="small"/>
            Delete
          </Button>

        </CardActions>
      </Card>  
    )
}

export default Contractor;

/*<Button aria-describedby={id} type="button" onClick={handleClick}>
              <CircularProgressbar value={(((contractor.softwares).length)/5)*100} text={`${(((contractor.softwares).length)/5)*100}%`}/>
            </Button>*/