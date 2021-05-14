const reducer__posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH ALL POST':
            return action.payload;
            case 'FETCH VERIFIED':
                return action.payload;
        case 'FETCH MY POSTS':
            return action.payload; //posts.map((post)=>post.account === action.payload._id?action.payload:posts);
        case 'FETCH ONE POST':
            return action.payload;
        case 'CREATE POST':
            return [
                ...posts,
                action.payload
            ];
        case 'UPDATE POST':
            return posts.map((post) => (
                post._id === action.payload._id
                    ? action.payload
                    : post
            ));
        case 'DELETE POST':
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;;
    }
}

export default reducer__posts;