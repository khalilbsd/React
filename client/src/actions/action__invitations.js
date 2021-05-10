import { api__get__invitations, api__post__invitations, api__patch__invitations, api__delete__invitations, api__get__invitation__by__requester, api__get__invitation__by__offerer, api__get__post__invitation } from '../API/api__invitations.js';

export const action__get__invitations = () => async (dispatch) => {
  try {
    const { data } = await api__get__invitations();
    dispatch({ type: 'FETCH ALL INVITATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }

}





export const action__post__invitations = (new__invitation) => async (dispatch) => {
  try {
    const { data } = await api__post__invitations(new__invitation);
    dispatch({ type: 'CREATE INVITATION', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const action__patch__invitations = (id, invitation) => async (dispatch) => {
  try {
    const { data } = await api__patch__invitations(id, invitation);
    dispatch({ type: 'UPDATE INVITATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const action__delete__invitations = (id) => async (dispatch) => {
  try {
    await api__delete__invitations(id);

    dispatch({ type: 'DELETE INVITATION', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};


export const action__get__invitation__by__requester = (id) => async (dispatch) => {
  try {
    const { data } = await api__get__invitation__by__requester(id);
    dispatch({ type: 'FETCH REQUESTER INVITATION', payload: data });
  } catch (error) {
    console.log(error);
  }

}


export const action__get__invitation__by__offerer = (id) => async (dispatch) => {
  try {
    const { data } = await api__get__invitation__by__offerer(id);
    dispatch({ type: 'FETCH OFFERER INVITATION', payload: data });
  } catch (error) {
    console.log(error);
  }

}


export const action__get__post__request__invitations = (id) => async (dispatch) => {
  try {
    const { data } = await api__get__post__invitation(id);
    dispatch({ type: 'FETCH POST INVITATION', payload: data });
  } catch (error) {
    console.log(error);
  }

}