import React, { useState, useEffect, useMemo } from "react";
import { TextField, Button, Typography, Paper, Select } from '@material-ui/core';
import Filebase from 'react-file-base64';
import { GrCircleInformation } from 'react-icons/gr';

import useStyle from './styles';
import { createContractor, updateContractor } from "../../actions/contractors";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const contractor = useSelector((state) => currentId ? state.contractors.find((c) => c._id === currentId) : null);
    const [checked, setChecked] = useState([]);


    const [categories, setCategories] = useState([
        {name: " BO-ADMIN ", info: "procedure"},
        {name: " SSH ", info: "procedure"},
        {name: " GITLAB/NEXUS ", info: "procedure"},
        {name: " GRAYLOG ", info: "procedure"},
        {name: " NEW-RELIC ", info: "procedure"},
        {name: " GECCO ", info: "procedure"},
        {name: " JIRA/CONFLUENCES ", info: "procedure"},
        {name: " SQREEN ", info: "procedure"},
        {name: " DIGIPOSTE-MANAGER ", info: "procedure"},
        {name: " AT-INTERNET ", info: "procedure"},
        {name: " AB-TASTY ", info: "procedure"},
        {name: " KLAXOON ", info: "procedure"},
        {name: " FIDUCEO ", info: "procedure"},
        {name: " DATAVIZ ", info: "procedure"},
        {name: " ADMINSTORE ", info: "procedure"},
        {name: " SERVICENOW ", info: "procedure"},
        {name: " SUPERVISION-FLUX ", info: "procedure"},
    ]);

    const [contractorData, setContractorData] = useState({
        firstname: '',
        lastname: '',
        position: '',
        head: '',
        vpn: '',
        vpnLogin: '',
        softwares: '',
        done: '',
        picture: '',
        beginMission: new Date(),
        endMission: new Date()
    })

    useEffect(() => {
            if(contractor) {
                setContractorData(contractor); 
            }
        }, [contractor])

    const clear = () => {
        setCurrentId('');
        setContractorData({firstname:'', lastname:'', position:'', beginMission:'', picture: '',softwares: '', done:'', endMission:'', vpnLogin:'', vpn:''})
    };
    
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
        setContractorData({...contractorData, softwares: all})
    };


    const showCategories = () => {
        return categories.map((c, i) => (
        
        <li key={i}>
            <div class="con-tooltip left">
                <Button>
                    <GrCircleInformation />
                </Button>
                <div class="tooltip ">
                    <p>{c.info}</p>
                </div>
            </div>
            <input
            onChange={handleToggle(c.name)}
            type="checkbox"
            className="mr-2"
            //defaultChecked={contractor.softwares.includes(c.name)}
            />
            <label className="form-check-label">{c.name}</label>
        </li>
        ));
    };

    const checkedCategories = () => {
        return contractor.softwares.map((item, index) => (
            <li key={index}>
                <div class="con-tooltip left">
                    <Button>
                        <GrCircleInformation />
                    </Button>
                    <div class="tooltip ">
                        <p>{item.info}</p>
                    </div>
                </div>
                <input
                onChange={handleToggle(item)}
                type="checkbox"
                className="mr-2"
                defaultChecked={contractor.done.includes(item)}
                />
                <label className="form-check-label">{item}</label>
            </li>
        ))
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId) {
            dispatch(updateContractor(currentId, contractorData));
        } else {
            dispatch(createContractor(contractorData));  
        }
        clear();
    };

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing': 'Creating'} contractor Form</Typography>
                <TextField required name="firstname" variant='outlined'label="firstname" fullWidth value={contractorData.firstname} onChange={(e) => setContractorData({ ...contractorData, firstname: e.target.value })}/>
                <TextField required name="lastname" variant='outlined'label="lastname" fullWidth value={contractorData.lastname} onChange={(e) => setContractorData({ ...contractorData, lastname: e.target.value })}/>
                <label>Position:</label>
                <Select name="position" variant='outlined'label="position" fullWidth value={contractorData.position} onChange={(e) => setContractorData({ ...contractorData, position: e.target.value })}>
                    <option value="" disabled selected>Select a position</option>
                    <option value="PO">Project Owner</option>
                    <option value="PM">Project Manager</option>
                    <option value="DEV">Developer</option>
                    <option value="TEST">Tester</option>
                </Select>
                <label>Head:</label>
                <Select name="head" variant='outlined'label="head" fullWidth value={contractorData.head} onChange={(e) => setContractorData({ ...contractorData, head: e.target.value })}>
                    <option value="COM">Commerce</option>
                    <option value="DIR">Direction</option>
                    <option value="DP">DP</option>
                    <option value="MCOM">MarketCom</option>
                    <option value="MRC">MRC</option>
                    <option value="NA">NA</option>
                    <option value="DT">DT</option>
                </Select> 
                <label>VPN:</label>
                <Select name="vpn" variant='outlined'label="vpn" fullWidth value={contractorData.vpn} onChange={(e) => setContractorData({ ...contractorData, vpn: e.target.value })}>
                    <option value="" disabled selected>Select a VPN</option>
                    <option value="VPN-CLI-DIGIPOSTE">VPN-CLI-DIGIPOSTE</option>
                    <option value="VPN-COMMERCE-DIGIPOSTE">VPN-COMMERCE-DIGIPOSTE</option>
                    <option value="VPN-DATA-DIGIPOSTE">VPN-DATA-DIGIPOSTE</option>
                    <option value="VPN-DEV-DIGIPOSTE">VPN-DEV-DIGIPOSTE</option>
                    <option value="VPN-DIRECTION-DIGIPOSTE">VPN-DIRECTION-DIGIPOSTE</option>
                    <option value="VPN-EXP-DIGIPOSTE">VPN-EXP-DIGIPOSTE</option>
                    <option value="VPN-MARKETING-DIGIPOSTE">VPN-MARKETING-DIGIPOSTE</option>
                    <option value="VPN-OPE-DIGIPOSTE">VPN-OPE-DIGIPOSTE</option>
                    <option value="VPN-PO-DIGIPOSTE">VPN-PO-DIGIPOSTE</option>
                </Select> 
                <div>
                    <h2>Softwares</h2>
                    <ul>
                       {currentId ? checkedCategories() : showCategories()} 
                    </ul>
                </div>
                <div className="fileInput">
                    <Filebase type="file" multiple={false} onDone={({base64})  => setContractorData({ ...contractorData, picture : base64 })}/>
                </div>
                <div className={classes.datepicker}>
                    <label>Begin Mission </label>
                    <input type="date" value={contractorData.beginMission} fullWidth onChange={(e) => setContractorData({...contractorData, beginMission: e.target.value })}></input>
                </div>
                <div className={classes.datepicker}>
                    <label>End Mission </label>
                    <input type="date" value={contractorData.endMission} fullWidth onChange={(e) => setContractorData({...contractorData, endMission: e.target.value })}></input>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color='primary' size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color='secondary' size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;