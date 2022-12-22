import mongoose from 'mongoose';
import Contractor from "../models/contractor.js";

export const getContractors = async (req, res) => {
    try {
        const contractors = await Contractor.find();

        console.log(contractors);

        res.status(200).json(contractors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createContractor = async (req, res) => {
    const contractor = req.body;

    const newContractor = new Contractor(contractor);

    try {
        await newContractor.save();

        res.status(201).json(newContractor)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

    console.log('CONTRACTOR CREATED');
}

export const updateContractor = async (req, res) => {
    const { id } = req.params;
    const { 
        firstname, 
        lastname, 
        position, 
        head, 
        vpn, 
        vpnLogin,
        softwares,
        done,
        picture, 
        beginMission, 
        endMission
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`no contractors with id: ${id}`)

    const updatedContractor = { 
        firstname, 
        lastname, 
        position, 
        head, 
        vpn, 
        vpnLogin,
        softwares,
        done,
        picture, 
        beginMission, 
        endMission, 
        _id: id};

        await Contractor.findByIdAndUpdate(id, updatedContractor, { new: true });

        res.json(updatedContractor);

        console.log('CONTRACTOR UPDATED');
}

export const deleteContractor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`no contractor with id: ${id}`);
    
    await Contractor.findByIdAndDelete(id);

    res.json({message: 'Post deleted succesfully'});

    console.log('CONTRACTOR DELETED');
}