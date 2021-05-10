import express from 'express';

import {get__eventmarketplaces,post__eventmarketplaces,patch__eventmarketplaces,delete__eventmarketplaces} from '../Controllers/crud__eventmarketplaces.js';

const eventmarketplaces__router=express.Router();

eventmarketplaces__router.get('/',get__eventmarketplaces);
eventmarketplaces__router.post('/',post__eventmarketplaces);
eventmarketplaces__router.patch('/:id',patch__eventmarketplaces);
eventmarketplaces__router.delete('/:id', delete__eventmarketplaces);

export default eventmarketplaces__router;