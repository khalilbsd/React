import express from 'express';

import {get__posts,post__posts,patch__posts,delete__posts,get__one__post, get__my__post} from '../Controllers/crud__posts.js';

const posts__router=express.Router();

posts__router.get('/',get__posts);
posts__router.get('/:id',get__one__post);
posts__router.get('/param/:id', get__my__post);
posts__router.post('/',post__posts);
posts__router.patch('/:id',patch__posts);
posts__router.delete('/:id',delete__posts);
export default posts__router;