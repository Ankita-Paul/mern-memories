import { Grow, Grid, Container} from "@material-ui/core";
import useStyles from "../../styles.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/postActions";
import Form from "../Form/Form";
import Posts from "../posts/Posts";


const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return ( <Grow in>
    <Container>
      <Grid
      className={classes.mainContainer}
        container
        justify="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow> );
}
 
export default Home;