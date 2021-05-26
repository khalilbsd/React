import model__posts from '../Models/model__posts.js';
import mongoose from 'mongoose';

export const get__posts=async(req,res)=>{
    try {
        const posts= await model__posts.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}


export const get__my__post = async (req, res) => {
    const {id: account_id} = req.params;
    try {
        const participants = await model__posts.find({"account": account_id});
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({message: error.message});
    }
}


export const get__one__post = async (req, res) => { 
    const { id:_id } = req.params;
    try {
        const post = await model__posts.findById(_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const post__posts=async(req,res)=>{
    const posts=req.body;
        const new__posts=new model__posts(posts); 
    try {
       await new__posts.save();
       res.status(201).json(new__posts);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const patch__posts = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    const updated__post = await model__posts.findByIdAndUpdate(_id, post, { new: true });
    res.json(updated__post);
}

export const delete__posts = async (req, res) => {
    const { id:_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    await model__posts.findByIdAndRemove(_id);

    res.json({ message: "post deleted" });
}


//post are differecnet from me and approved
export const get__verified__posts = async (req, res) => {
    const { id: account } = req.params;
    const place_id = req.params.event_id;
    const state = "true";
    try {
        const posts = await model__posts.find({ "verified_by_admin": state, "place_id": place_id, "account": { $ne: account } });
        res
            .status(200)
            .json(posts);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}


export const get__admin__posts = async (req, res) => {
    const {id:place_id} = req.params;
    try {
        const posts = await model__posts.find({"place_id": place_id});
        res
            .status(200)
            .json(posts);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}

