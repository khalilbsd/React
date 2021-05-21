import { api__get__participants, api__post__participants, api__patch__participants, api__delete__participants, api__get__one__participants, api__get__my__events, api__get__my__participation } from '../API/api__participants.js';

export const action__get__participants = () => async (dispatch) => {
  try {
    const { data } = await api__get__participants();
    dispatch({ type: 'FETCH ALL PARITCIPANT', payload: data });
  } catch (error) {
    console.log(error.message);
  }

}

export const action__get__one__participants = (id) => async (dispatch) => {
  try {
    const { data } = await api__get__one__participants(id);
    dispatch({ type: 'FETCH ONE PARITCIPANT', payload: data });
  } catch (error) {
    console.log(error.message);
  }

}

//get my the events that i'm participated in 
export const action__get__my__events= (id) => async (dispatch) => {
  try {
    const { data } = await api__get__my__events(id);
    dispatch({ type: 'GET MY EVENTS', payload: data });
  } catch (error) {
    console.log(error.message);
  }

}

export const action__post__participants = (new__participant) => async (dispatch) => {
  try {
    const { data } = await api__post__participants(new__participant);
    dispatch({ type: 'CREATE PARITCIPANT', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const action__patch__participants = (id, participant) => async (dispatch) => {
  try {
    const { data } = await api__patch__participants(id, participant);

    dispatch({ type: 'UPDATE PARITCIPANT', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const action__delete__participants = (id) => async (dispatch) => {
  try {
    await api__delete__participants(id);

    dispatch({ type: 'DELETE PARITCIPANT', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};



//my participation
export const action__get__my__particiption = (id, event) => async (dispatch) => {
  try {
    const { data } = await api__get__my__participation(id, event);
    dispatch({ type: 'VERIFY PARTICIPATION', payload: data });
  } catch (error) {
    console.log(error.message);
  }

}

