import { api__get__accounts, api__post__accounts, api__patch__accounts, api__delete__accounts, api__get__one__account } from '../API/api__accounts.js';

export const action__get__accounts = () => async (dispatch) => {
  try {
    const { data } = await api__get__accounts();
    dispatch({ type: 'FETCH ALL ACCOUNTS', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const action__post__accounts = (new__account) => async (dispatch) => {
  try {
    const { data } = await api__post__accounts(new__account);
    dispatch({ type: 'CREATE ACCOUNTS', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const action__patch__accounts = (id, account) => async (dispatch) => {
  try {
    const { data } = await api__patch__accounts(id, account);

    dispatch({ type: 'UPDATE ACCOUNTS', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const action__delete__account = (id) => async (dispatch) => {
  try {
    await api__delete__accounts(id);

    dispatch({ type: 'DELETE ACCOUNTS', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const action__get__one__account = (id) => async (dispatch) => {
  try {
    const { data } = await api__get__one__account(id);
    dispatch({ type: 'FETCH ONE ACCOUNTS', payload: data });
  } catch (error) {
    console.log(error);
  }
}