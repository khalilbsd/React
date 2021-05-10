const reducer__login=(id=[] ,action)=>{
    switch (action.type) {
        case 'SET ID':
            return [...id, action.payload];
        default: 
            return id;
    }
}

export default reducer__login;