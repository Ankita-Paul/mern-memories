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
    console.log("post fetched:", post);
    const { data } = await api.createPost(post);
    console.log("data saved", data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  console.log("update req sent");
  try {
    const { data } = await api.updatePost(id, post);
    console.log("updated", data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    console.log("del req sent");
    await api.deletePost(id);
    console.log("deleted");
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log("the error is here");
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
