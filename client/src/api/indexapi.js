import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchData = () => axios.get(url);
export const createPost = (newPost) => {
  return axios.post(url, newPost);
};

export const updatePost = (id, post) => {
  return axios.patch(`${url}/${id}`, post);
};
export const deletePost = (id) => {
  axios
    .delete(`${url}/${id}`)
    .then((res) => console.log("res:", res))
    .catch((err) => console.log(err));
  return axios.delete(`${url}/${id}`);
};
export const likeCountIncrease = (id) => {
  axios
    .patch(`${url}/${id}/likePost`)
    .then((res) => console.log("like count result: ", res))
    .catch((err) => console.log(err));
  return axios.patch(`${url}/${id}/likePost`);
};
