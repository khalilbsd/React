const reducer__participants = (participants = [], action) => {
    switch (action.type) {
        case 'FETCH ALL PARITCIPANT':
            return action.payload;
        case 'VERIFY':
            return action.payload;
        case 'FETCH BY PARAM':
            return action.payload; //participants.map((participant)=>participant.account_id === action.payload._id?action.payload:participant);
        case 'CREATE PARITCIPANT':
            return [...participants, action.payload];
        case 'UPDATE PARITCIPANT':
            return participants.map((participant) => (participant._id === action.payload._id ? action.payload : participant));
        case 'DELETE PARITCIPANT':
            return participants.filter((participant) => participant._id !== action.payload);
        default:
            return participants;
    }
}

export default reducer__participants;