import * as api from "../api/indexapi.js";
import actionType from "../constants/actionTypes.js";
const { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE } = actionType;

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchData();
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeCountIncrease = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeCountIncrease(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
