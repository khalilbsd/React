import mongoose from 'mongoose';

const schema__posts = mongoose.Schema({
    account: String,
    place_id: {
        type: String,
        default: "generalmarketplace",
    },
    title: String,
    image: String,
    file: String,
    video: String,
    description: String,
    type: String,
    state: String,
    industrial_field: String,
    date_time: {
        type: Date,
        default: new Date()
    },
    seen: {
        type: String,
        default: "false"
    },
    verified_by_admin:{
        type:String,
        default:false,
    },
});

const model__posts = mongoose.model('posts', schema__posts);

export default model__posts;