const reducer__events = (events = [], action) => {
    switch (action.type) {
        case 'FETCH ALL EVENT':
            return action.payload;
        case 'FETCH ONE EVENT':
            return action.payload;
        case 'CREATE EVENT':
            return [
                ...events,
                action.payload
            ];

        case 'UPDATE EVENT':
            return events.map((event) => (
                event._id === action.payload._id
                    ? action.payload
                    : event
            ));
        case 'DELETE EVENT':
            return events.filter((event) => event._id !== action.payload);
        default:
            return events;;
    }
}

export default reducer__events;