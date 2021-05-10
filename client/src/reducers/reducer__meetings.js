const reducer__meetings=(meetings =[],action)=>{
    switch (action.type) {
        case 'FETCH ALL':
            return action.payload;
        case 'CREATE':
            return [...meetings, action.payload];
            case 'UPDATE':
                return meetings.map((meeting) => (meeting._id === action.payload._id ? action.payload : meeting));
            case 'DELETE':
                return meetings.filter((meeting) => meeting._id !== action.payload);
        default: 
            return meetings;;
    }
}

export default reducer__meetings;