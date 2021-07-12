import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req)=>{
  if(localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}` 
  }
  return req;
})

export const fetchData = () => API.get("/posts");
export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, post) => {
  return API.patch(`/posts/${id}`, post);
};
export const deletePost = (id) => {
  
  return API.delete(`/posts/${id}`);
};
export const likeCountIncrease = (id) => {
 
  return API.patch(`/posts/${id}/likePost`);
};

export const signin = (formData) => API.post(`/auth/signin` , formData)
export const signup = (formData) => API.post(`/auth/signup` , formData)
