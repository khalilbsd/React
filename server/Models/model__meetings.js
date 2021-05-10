import mongoose from 'mongoose';

const schema__meetings = mongoose.Schema({
    unique_id: {
        unique: true, //made just so one can not sent a meeting request twice, and also if one's request has been denied they can't send another one
        index: true, //required with unique
        type: String
    },
    event_id: String,
    party_one_id: String,
    party_two_id: String,
    location: String,
    date: Date,
    duration: {
        type: Number,
        default: 15
    },
    state: {
        type: String,
        default: "pending"
    }
});

const model__meetings = mongoose.model('meetings', schema__meetings);

model__meetings.createIndexes()

export default model__meetings;