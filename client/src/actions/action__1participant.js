export const action__1participant = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'SET ID', payload: id });
    } catch (error) {
        console.log(error);
    }
}

