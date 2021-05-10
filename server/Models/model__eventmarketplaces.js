import mongoose from 'mongoose';

const schema__eventmarketplaces=mongoose.Schema({
    id: String,
    event_id: String
});

const model__eventmarketplaces=mongoose.model('eventmarketplaces',schema__eventmarketplaces) ;

export default model__eventmarketplaces;