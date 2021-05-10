import model__eventmarketplaces from '../Models/model__eventmarketplaces.js';
import mongoose from 'mongoose';

export const get__eventmarketplaces=async(req,res)=>{
    try {
        const eventmarketplaces= await model__eventmarketplaces.find();
        res.status(200).json(eventmarketplaces);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const post__eventmarketplaces=async(req,res)=>{
    const eventmarketplace=req.body;
        const new__eventmarketplace=new model__eventmarketplaces(eventmarketplace); 
    try {
       await new__eventmarketplace.save();
       res.status(201).json(new__eventmarketplace);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const patch__eventmarketplaces = async (req, res) => {
    const { id: _id } = req.params;
    const eventmarketplace = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No eventmarketplace with id: ${_id}`);

    const updated__eventmarketplace = await model__eventmarketplaces.findByIdAndUpdate(_id, updated__eventmarketplace, { new: true });

    res.json(updated__eventmarketplace);
}

export const delete__eventmarketplaces = async (req, res) => {
    const { id:_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No eventmarketplace with id: ${_id}`);

    await model__eventmarketplaces.findByIdAndRemove(_id);

    res.json({ message: "eventmarketplace deleted" });
}