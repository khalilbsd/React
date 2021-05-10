import model__meetings from '../Models/model__meetings.js';
import mongoose from 'mongoose';

export const get__meetings = async (req, res) => {
    try {
        const meetings = await model__meetings.find();
        res.status(200).json(meetings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const get__my__meeting = async (req, res) => {
    const { id: account_id } = req.params;
    try {
        const participants = await model__meetings.find({ "account": account_id });
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}


export const get__one__meeting = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const meeting = await model__meetings.findById(_id);
        res.status(200).json(meeting);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const post__meetings = async (req, res) => {
    const meetings = req.body;
    const new__meetings = new model__meetings(meetings);
    try {
        await new__meetings.save();
        res.status(201).json(new__meetings);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const patch__meetings = async (req, res) => {
    const { id: _id } = req.params;
    const meeting = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No meeting with id: ${_id}`);
    const updated__meeting = await model__meetings.findByIdAndUpdate(_id, meeting, { new: true });
    res.json(updated__meeting);
}

export const delete__meetings = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No meeting with id: ${_id}`);
    await model__meetings.findByIdAndRemove(_id);

    res.json({ message: "meeting deleted" });
}


