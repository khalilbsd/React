import { combineReducers } from 'redux';
import reducer__accounts from './reducer__accounts.js';
import reducer__eventmarketplace from './reducer__eventmarketplaces.js';
import reducer__events from './reducer__events.js';
import reducer__invitations from './reducer__invitations.js';
import reducer__meetings from './reducer__meetings.js';
import reducer__participants from './reducer__participants.js';
import reducer__posts from './reducer__posts.js';
import reducer__login from './reducer__login.js';

export default combineReducers({
    reducer__login,
    reducer__accounts,
    reducer__eventmarketplace,
    reducer__events,
    reducer__invitations,
    reducer__meetings,
    reducer__participants,
    reducer__posts,
});