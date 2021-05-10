import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';


//Importing all the API routes
import accounts__router from './routes/api__accounts.js';
import eventmarketplaces__router from './routes/api__eventmarketplaces.js';
import events__router from './routes/api__events.js';
import invitations__router from './routes/api__invitations.js';
import meetings__router from './routes/api__meetings.js';
import participants__router from './routes/api__participants.js';
import posts__router from './routes/api__posts.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(cookieParser());

//Setting up the API router prefix
app.use('/api/accounts', accounts__router);
app.use('/api/eventmarketplaces', eventmarketplaces__router);
app.use('/api/events', events__router);
app.use('/api/invitations', invitations__router);
app.use('/api/meetings', meetings__router);
app.use('/api/participants', participants__router);
app.use('/api/posts', posts__router);

const CNX_URL = "mongodb+srv://khalilbensaid:9847123@pfecluster.zq21k.mongodb.net/Matching-App?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.connect(CNX_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is Running ${PORT}`)))
    .catch((error) => console.log(error.message));
mongoose.set('useFindAndModify', false);



