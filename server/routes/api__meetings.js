import express from 'express';

import { get__meetings, post__meetings, patch__meetings, delete__meetings, get__one__meeting, get__my__meeting } from '../Controllers/crud__meetings.js';

const meetings__router = express.Router();

meetings__router.get('/', get__meetings);
meetings__router.get('/:id', get__one__meeting);
meetings__router.get('/param/:id', get__my__meeting);
meetings__router.post('/', post__meetings);
meetings__router.patch('/:id', patch__meetings);
meetings__router.delete('/:id', delete__meetings);
export default meetings__router;