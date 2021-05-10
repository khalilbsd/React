import express from 'express';
import Auth from "../middleware/auth.js";

import {register,login,auth,logout,get__accounts,post__accounts,patch__accounts,delete__accounts,get__one__account} from '../Controllers/crud__accounts.js';

const accounts__router=express.Router();

accounts__router.post('/register',register);
accounts__router.post('/login', login);
accounts__router.get('/auth', Auth,auth);
accounts__router.get('/logout', Auth,logout);

accounts__router.get('/',get__accounts);
accounts__router.get('/:id',get__one__account);
accounts__router.post('/', post__accounts);
accounts__router.patch('/:id',patch__accounts);
accounts__router.delete('/:id',delete__accounts);


export default accounts__router;