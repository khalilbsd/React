import {api__get__posts,api__post__posts,api__patch__posts,api__delete__posts,api__get__one__post,api__get__my__post,api__get__verified__posts} from '../API/api__posts.js';

export const action__get__posts=()=> async(dispatch)=>{
   try {
       const {data}=await api__get__posts();
       dispatch({ type: 'FETCH ALL POST', payload:data});
   } catch (error) {
       console.log(error);
   }
   
}

export const action__get__one__post=(id)=> async(dispatch)=>{
  try {
      const {data}=await api__get__one__post(id);
      dispatch({ type: 'FETCH ONE POST', payload:data});
  } catch (error) {
      console.log(error);
  }
  
}

export const action__get__my__posts=(id)=> async(dispatch)=>{
  try {
      const {data}=await api__get__my__post(id);
      dispatch({ type: 'FETCH MY POSTS', payload:data});
  } catch (error) {
      console.log(error.message);
  }
  
}

export const action__post__posts=(new__post)=>async(dispatch)=>{
    try {
        const { data } = await api__post__posts(new__post);
        dispatch({ type: 'CREATE POST', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const action__patch__posts = (id, post) => async (dispatch) => {
    try {
      const { data } = await api__patch__posts(id, post);
  
      dispatch({ type: 'UPDATE POST', payload: data });
    } catch (error) {
      console.log(error);
    }
};

export const action__delete__posts = (id) => async (dispatch) => {
    try {
      await api__delete__posts(id);
  
      dispatch({ type: 'DELETE POST', payload:id });
    } catch (error) {
      console.log(error);
    }
  };

  export const action__get__verified__posts=(id,event_id)=> async(dispatch)=>{ 
    try {
        const {data}=await api__get__verified__posts(id,event_id);
        dispatch({ type: 'FETCH VERIFIED', payload:data});
    } catch (error) {
        console.log(error);
    }
    
 }

