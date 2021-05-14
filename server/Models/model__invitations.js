import mongoose from 'mongoose';

const schema__invitations=mongoose.Schema({
    id: String,
    state: {
        type: String,
        default:"pending"
    },
    post_id: String,
    offerer_id: String,
    requester_id: String,
    description:String,
});

const model__invitations=mongoose.model('invitations',schema__invitations) ;

export default model__invitations;