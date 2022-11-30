import React from 'react';
import Contractor from './Contractor/Contractor';
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";

import useStyles from './styles';
import './Contractors.css';
import { CircularProgress, Grid, Container, TextField, Searchbar } from '@material-ui/core';


const Contractors = ({ setCurrentId }) => {
    const classes = useStyles();
    const contractors = useSelector((state) => state.contractors)
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value)
    }

    return (
        !contractors.length ? <CircularProgress /> :(
            <Container>
                <Grid>
                    <div>
                        <input 
                        id="search" 
                        name="search" 
                        type="text" 
                        placeholder="Enter a firstname..."
                        onChange={handleSearchTerm}
                        />
                        <input  value="Rechercher" name="searchBt" type="submit"></input>
                    </div>
                </Grid>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {contractors.filter((contractors) => {
                        return (
                            contractors.firstname.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                        )
                    }).map((contractor) => (
                        <Grid item key={contractor._id} xs={12} sm={6}>
                            <Contractor contractor={contractor} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        )
    )
}

export default Contractors