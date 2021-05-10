import { api__get__events, api__post__events, api__patch__events, api__delete__events, api__get__one__event } from '../API/api__events.js';

export const action__get__events = () => async (dispatch) => {
  try {
    const { data } = await api__get__events();
    dispatch({ type: 'FETCH ALL EVENT', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}



export const action__post__events = (new__event) => async (dispatch) => {
  try {
    const { data } = await api__post__events(new__event);
    dispatch({ type: 'CREATE EVENT', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const action__patch__events = (id, event) => async (dispatch) => {
  try {
    const { data } = await api__patch__events(id, event);

    dispatch({ type: 'UPDATE EVENT', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const action__delete__events = (id) => async (dispatch) => {
  try {
    await api__delete__events(id);

    dispatch({ type: 'DELETE EVENT', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

//get one event
export const action__get__one__event = (id) => async (dispatch) => {
  try {
    const { data } = await api__get__one__event(id);
    dispatch({ type: 'FETCH ONE EVENT', payload: data });
  } catch (error) {
    console.log(error);
  }

}