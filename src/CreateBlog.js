// import React, { useState } from 'react';

// import { Editor } from 'slate-react';
// import { Value } from 'slate';


// const initialValue = Value.fromJSON({
//     document: {
//         nodes: [
//             {
//                 object: 'block',
//                 type: 'paragraph',
//                 nodes: [
//                     {
//                         object: 'text',
//                         text: 'A line of text in a paragraph.',
//                     },
//                 ],
//             },
//         ],
//     },
// })

// function CreateBlog(props) {
//     const [content, setContent] = useState(initialValue);
//     const onChange = (editor) => {
//         console.log(editor.value);
//         setContent(editor.value);
//     };
//     return(
//         <Editor 
//             spellCheck
//             autoFocus 
//             value={content} 
//             onChange={onChange} />
//     );
// }

// export default CreateBlog;

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import axios from 'axios';
import { globalVariable } from './GlobalVariable'

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
  }));


//   curl -d "title=post&content=content&user=1" -X POST http://localhost:8000/api/v1/posts/

function CreateBlog(props) {
    const classes = useStyles();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("You have created blog successfully!")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAlertClose = () => {
        setAlertOpen(false);
    }

    const postFunc = () => {
        const url = globalVariable.host + "/api/v1/posts/";
        axios.post(url, {
            title: title,
            content: content,
            user: 1
        }).then((response)=>{
            setAlertMessage("You have created blog successfully!");
            setAlertOpen(true);
        }).catch((e)=>{
            console.log(e);
            setAlertMessage("You have failed to create the blog");
            setAlertOpen(true);
        });
    }

    return (
        <div>
            <TextField
                id="blog-title"
                label="Blog Title"
                fullWidth
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <TextField
                id="blog-content"
                label="Blog Content"
                multiline
                fullWidth
                rows="25"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(event) => {
                    setContent(event.target.value);
                }}
            />
            <Button 
                variant="contained" color="primary" className={classes.button}
                onClick={postFunc} >
                Post 
            </Button>

            <Dialog
                open={alertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alertMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateBlog;