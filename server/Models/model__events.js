import mongoose from 'mongoose';

const schema__events = mongoose.Schema({
    title: String,
    start_date: Date,
    end_date: Date,
    location: String,
    industrial_sector: String,
    description: String,
    image: String,
    state: {
        type: String,
        default: "true"
    },
});

const model__events = mongoose.model('events', schema__events);

export default model__events;