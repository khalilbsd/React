import mongoose from 'mongoose';

const schema__posts = mongoose.Schema({
    account: String,
    place_id: {// if this post belongs to an event marketplace this field will contain the id of the event: this helps with displaying in the event/general marketplace only the posts that belong to it
        type: String,
        default: "generalmarketplace",
    },
    type: String,
    title: String,
    image: String,
    file: String,
    video: String,
    desc: String,
    state: String,
    date_time: {
        type: Date,
        default: new Date()
    },
    description: String,
    verified_by_admin:{
        type:String,
        default:false,
    },
    industrial_field:String,
});

const model__posts = mongoose.model('posts', schema__posts);

export default model__posts;