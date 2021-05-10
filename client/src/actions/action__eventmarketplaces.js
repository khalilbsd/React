import { api__get__eventmarketplaces, api__post__eventmarketplaces, api__patch__eventmarketplaces, api__delete__eventmarketplaces } from '../API/api__eventmarketplaces.js';

export const action__get__eventmarketplaces = () => async (dispatch) => {
  try {
    const { data } = await api__get__eventmarketplaces();
    dispatch({ type: 'FETCH ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const action__post__eventmarketplaces = (new__eventmarketplace) => async (dispatch) => {
  try {//finding my participation in a particular event
    export const get__my__participation = async (req, res) => {
      const { id: account_id } = req.params;
      const { event: event_id } = req.params;
      try {
        const participants = await model__participants.find({ "account_id": account_id, "event_id": event_id });
        res
          .status(200)
          .json(participants);
      } catch (error) {
        res
          .status(404)
          .json({ message: error.message });
      }
    }
    const { data } = await api__post__eventmarketplaces(new__eventmarketplace);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const action__patch__eventmarketplaces = (id, eventmarketplace) => async (dispatch) => {
  try {
    const { data } = await api__patch__eventmarketplaces(id, eventmarketplace);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const action__delete__eventmarketplaces = (id) => async (dispatch) => {
  try {
    await api__delete__eventmarketplaces(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};