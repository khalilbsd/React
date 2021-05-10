const reducer__invitations = (invitations = [], action) => {
    switch (action.type) {
        case 'FETCH ALL INVITATION':
            return action.payload;
        case 'FETCH REQUESTER INVITATION':
            return action.payload;
        case 'FETCH OFFERER INVITATION':
            return action.payload;
        case 'FETCH POST INVITATION':
            return action.payload;
        case 'CREATE INVITATION':
            return [...invitations, action.payload];
        case 'UPDATE INVITATION':
            return invitations.map((invitation) => (invitation._id === action.payload._id ? action.payload : invitation));
        case 'DELETE INVITATION':
            return invitations.filter((invitation) => invitation._id !== action.payload);
        default:
            return invitations;;
    }
}

export default reducer__invitations;