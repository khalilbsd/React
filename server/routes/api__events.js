import express from 'express';

import { get__events, post__events, patch__events, delete__events, get__one__event} from '../Controllers/crud__events.js';

const events__router = express.Router();

events__router.get('/', get__events);
events__router.get('/:id', get__one__event);
//events__router.get('/myevents/:id', get__my__event);
events__router.post('/', post__events);
events__router.patch('/:id', patch__events);
events__router.delete('/:id', delete__events);
export default events__router;