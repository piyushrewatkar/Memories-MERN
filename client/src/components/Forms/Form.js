import React, { useState ,useEffect} from 'react';
import makeStyles from './stylesForm';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { createPost ,updatePost} from '../../actions/posts';
import { useDispatch, useSelector} from 'react-redux';
//import { fetchPosts } from '../../api/service';

const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = makeStyles();

    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

    const clear = () => {
      setCurrentId(0);
      setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost(postData));
            clear();
          } else {
            dispatch(updatePost(currentId, postData));
            clear();
          }
    };
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField
                    variant="outlined"
                    name="creator"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}>
                </TextField>
                <TextField
                    variant="outlined"
                    name="title"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}>
                </TextField>
                <TextField
                    variant="outlined"
                    name="message"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}>
                </TextField>
                <TextField
                    variant="outlined"
                    name="tags"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')  })}>
                </TextField>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    ></FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;