import model__events from '../Models/model__events.js';
import mongoose from 'mongoose';

export const get__events = async (req, res) => {
    try {
        const events = await model__events.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const get__my__event = async (req, res) => {
    const { id: account_id } = req.params;
    try {
        const participants = await model__events.find({ "account": account_id });
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}


export const get__one__event = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const event = await model__events.findById(_id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const post__events = async (req, res) => {
    const events = req.body;
    const new__events = new model__events(events);
    try {
        await new__events.save();
        res.status(201).json(new__events);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const patch__events = async (req, res) => {
    const { id: _id } = req.params;
    const event = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No event with id: ${_id}`);
    const updated__event = await model__events.findByIdAndUpdate(_id, event, { new: true });
    res.json(updated__event);
}

export const delete__events = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No event with id: ${_id}`);
    await model__events.findByIdAndRemove(_id);

    res.json({ message: "event deleted" });
}