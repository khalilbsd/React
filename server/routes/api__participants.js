import express from 'express';

import { get__participants, post__participants, patch__participants, delete__participants, get__one__participant, get__participants__by__param, get__my__participation } from '../Controllers/crud__participants.js';

const participants__router = express.Router();

participants__router.get('/', get__participants);
participants__router.get('/:id', get__one__participant);
participants__router.get('/param/:id', get__participants__by__param);
participants__router.get('/param/:id/:event', get__my__participation);
participants__router.post('/', post__participants);
participants__router.patch('/:id', patch__participants);
participants__router.delete('/:id', delete__participants);

export default participants__router;