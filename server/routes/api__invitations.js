import express from 'express';

import { get__invitations, post__invitations, patch__invitations, delete__invitations, get__invitations__by__requester, get__invitations__by__offerer, get__invitations__of__posts__request } from '../Controllers/crud__invitations.js';

const invitations__router = express.Router();

invitations__router.get('/', get__invitations);
invitations__router.get('/requester/:id', get__invitations__by__requester);
invitations__router.get('/offerer/:id', get__invitations__by__offerer);
invitations__router.get('/post/:id/admin', get__invitations__of__posts__request);
invitations__router.post('/', post__invitations);
invitations__router.patch('/:id', patch__invitations);
invitations__router.delete('/:id', delete__invitations);

export default invitations__router;