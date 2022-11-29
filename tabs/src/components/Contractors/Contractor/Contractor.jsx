import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import useStyles from './styles';
import { useDispatch } from "react-redux";

import { deleteContractor } from "../../../actions/contractors";


const Contractor = ({ contractor, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={contractor.picture || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={contractor.position}/>
        <div className={classes.overlay}>
          <Typography variant="h6">{contractor.firstname}</Typography>
          <Typography variant="h5">{contractor.lastname}</Typography>
          <Typography variant="h7">{contractor.position}</Typography>
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



/*import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteContractor } from '../../../actions/contractors';

//import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Contractor = ({ contractor, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography variant="h6">{contractor.firstname}</Typography>
      </div>
      <div className={classes.overlay}>
        <Typography variant="h6">{contractor.lastname}</Typography>
      </div>
    </Card>
  );
};

export default Contractor;*/