export const action__post__id=(id)=>async(dispatch)=>{
    try {
        dispatch({ type: 'SET ID', payload: id });
    } catch (error) {
        console.log(error);
    }
}

