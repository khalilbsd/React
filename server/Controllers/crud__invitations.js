import model__invitations from '../Models/model__invitations.js';
import mongoose from 'mongoose';

export const get__invitations = async (req, res) => {
    try {
        const invitations = await model__invitations.find();
        res.status(200).json(invitations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const post__invitations = async (req, res) => {
    const invitation = req.body;
    const new__invitation = new model__invitations(invitation);
    try {
        await new__invitation.save();
        res.status(201).json(new__invitation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const patch__invitations = async (req, res) => {
    const { id: _id } = req.params;
    const invitation = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No invitation with id: ${_id}`);

    const updated__invitation = await model__invitations.findByIdAndUpdate(_id, invitation, { new: true });

    res.json(updated__invitation);
}

export const delete__invitations = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No invitation with id: ${_id}`);

    await model__invitations.findByIdAndRemove(_id);

    res.json({ message: "invitation deleted" });
}


// by param 
export const get__invitations__by__requester = async (req, res) => {
    const { id: requester_id } = req.params;
    try {
        const invite = await model__invitations.find({ "requester_id": requester_id });
        res
            .status(200)
            .json(invite);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}

export const get__invitations__by__offerer = async (req, res) => {

    const { id: offerer_id } = req.params;
    try {
        const invite = await model__invitations.find({ "offerer_id": offerer_id });
        res
            .status(200)
            .json(invite);
    } catch (error) {
        res
            .status(404)
            .json(error);
    }

}


//post requests
export const get__invitations__of__posts__request = async (req, res) => {
    const admin = "admin";
    const { id: requester_id } = req.params;
    try {
        const invite = await model__invitations.find({ "requester_id": requester_id, "offerer_id": admin });
        res
            .status(200)
            .json(invite);
    } catch (error) {
        res
            .status(404)
            .json(error);
    }

}

export const verify__invitation = async (req, res) => {
    const { id: requester_id } = req.params;
    const { post: post_id } = req.params;
    try {
        const participants = await model__invitations.find({ "requester_id": requester_id, "post_id": post_id });
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}