import mongoose from 'mongoose';

const contractorSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    position: String,
    head: String,
    vpn: String,
    vpnLogin: String,
    softwares: [String],
    done: [String],
    picture: String,
    beginMission: {
        type: Date,
        default: new Date()
    },
    endMission: {
        type: Date,
        default: new Date()
    },
});

const Contractor = mongoose.model('Contractor', contractorSchema);

export default Contractor;