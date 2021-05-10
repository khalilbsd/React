import {api__get__meetings,api__post__meetings,api__patch__meetings,api__delete__meetings} from '../API/api__meetings.js';

export const action__get__meetings=()=> async(dispatch)=>{
   try {
       const {data}=await api__get__meetings();
       dispatch({ type: 'FETCH ALL', payload:data});
   } catch (error) {
       console.log(error.message);
   }
   
}

export const action__post__meetings=(new__meeting)=>async(dispatch)=>{
    try {
        const { data } = await api__post__meetings(new__meeting);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const action__patch__meetings = (id, meeting) => async (dispatch) => {
    try {
      const { data } = await api__patch__meetings(id, meeting);
  
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const action__delete__meetings = (id) => async (dispatch) => {
    try {
      await action__delete__meetings(id);
  
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };