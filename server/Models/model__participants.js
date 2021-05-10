import mongoose from 'mongoose';

const schema__participants = mongoose.Schema({
    account_id: String,
    event_id: String,
    desc: String,
    verified_by_admin: {
        type: String,
        default: "false"
    },
});

const model__participants = mongoose.model('participants', schema__participants);

export default model__participants;