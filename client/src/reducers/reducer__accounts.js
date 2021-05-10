const reducer__accounts = (accounts = [], action) => {
    switch (action.type) {
        case 'FETCH ALL ACCOUNTS':
            return action.payload;
        case 'FETCH ONE ACCOUNTS':
            return action.payload;
        case 'CREATE ACCOUNTS':
            return [
                ...accounts,
                action.payload
            ];
        case 'UPDATE ACCOUNTS':
            return accounts.map((account) => (
                account._id === action.payload._id
                    ? action.payload
                    : account
            ));
        case 'DELETE ACCOUNTS':
            return accounts.filter((account) => account._id !== action.payload);
        default:
            return accounts;
    }
}

export default reducer__accounts;