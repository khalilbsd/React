import model__participants from '../Models/model__participants.js';
import mongoose from 'mongoose';

export const get__participants = async (req, res) => {
    try {
        const participants = await model__participants.find();
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}

export const get__participants__by__param = async (req, res) => {
    const { id: account_id } = req.params;
    try {
        const participants = await model__participants.find({ "account_id": account_id });
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}




export const get__one__participant = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const participant = await model__participants.findById(_id);
        res
            .status(200)
            .json(participant);
    } catch (error) {
        res
            .status(404)
            .json(error.message);
    }
}

export const post__participants = async (req, res) => {
    const participant = req.body;
    const new__participant = new model__participants(participant);
    try {
        await new__participant.save();
        res
            .status(201)
            .json(new__participant);
    } catch (error) {
        res
            .status(409)
            .json({ message: error.message });
    }
}

export const patch__participants = async (req, res) => {
    const { id: _id } = req.params;
    const participant = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res
            .status(404)
            .send(`No participant with id: ${_id}`);
    const updated__participant = await model__participants.findByIdAndUpdate(
        _id,
        participant,
        { new: true }
    );
    res.json(updated__participant);
}

export const delete__participants = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res
            .status(404)
            .send(`No participant with id: ${_id}`);

    await model__participants.findByIdAndRemove(_id);

    res.json({ message: "participant deleted" });
}

//finding my participation in a particular event
export const get__my__participation = async (req, res) => {
    const { id: account_id } = req.params;
    const { event: event_id } = req.params;
    try {
        const participants = await model__participants.find({ "account_id": account_id, "event_id": event_id });
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}