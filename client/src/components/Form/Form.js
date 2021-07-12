import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import useStyles from "./formStyles.js";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions.js";
import { useSelector } from "react-redux";
//get the current id

const Form = ({ setCurrentId, currentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h6">
          Please Sign In to Create Memories and Like Other's Memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          onChange={(e) => {
            const creator = e.target.value;
            setPostData((preVal) => ({ ...preVal, creator }));
          }}
          value={postData.creator}
        /> */}

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={(e) => {
            const title = e.target.value;
            setPostData((preVal) => ({ ...preVal, title }));
          }}
          value={postData.title}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          onChange={(e) => {
            const message = e.target.value;
            setPostData((preVal) => ({ ...preVal, message }));
          }}
          value={postData.message}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags(coma separated)"
          fullWidth
          onChange={(e) => {
            const tags = e.target.value;
            setPostData((preVal) => ({
              ...preVal,
              tags: tags.split(","),
            }));
          }}
          value={postData.tags}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData((preVal) => ({
                ...preVal,
                selectedFile: base64,
              }));
            }}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
