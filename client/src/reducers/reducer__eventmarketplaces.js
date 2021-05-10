const reducer__eventmarketplaces=(eventmarketplaces =[],action)=>{
    switch (action.type) {
        case 'FETCH ALL':
            return action.payload;
        case 'CREATE':
            return [...eventmarketplaces, action.payload];
            case 'UPDATE':
            return eventmarketplaces.map((eventmarketplace) => (eventmarketplace._id === action.payload._id ? action.payload : eventmarketplace));
        case 'DELETE':
            return eventmarketplaces.filter((eventmarketplace) => eventmarketplace._id !== action.payload);
        default: 
            return eventmarketplaces;;
    }
}

export default reducer__eventmarketplaces;