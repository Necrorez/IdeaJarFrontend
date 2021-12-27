import React, { useState ,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';
import DeleteIcon from '@mui/icons-material/Delete';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NewPost() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: '',
    content: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .post('categories/' + id + '/posts/', {
        title: formData.title,
        content: formData.content,
        author: localStorage.getItem('user_id'),
        category: id
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>New Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                id="title"
                label="Title name"
                name="title"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="content"
                label="Content"
                type="text"
                id="content"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Create new post
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

function DeletePost() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .delete('categories/' + id + '/posts/' + id2 + '/', {
      })
      .then((res) => {
        navigate('/category/' + id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant="contained" color="error" onClick={handleOpen}>Delete Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Delete This Post
          </Button>
        </Box>
      </Modal>
    </div>
  );
}


function NewComment() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const initialFormData = Object.freeze({
    title: '',
    content: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .post('categories/' + id + '/posts/' + id2 + '/comments/', {
        comment: formData.comment,
        user: localStorage.getItem('user_id'),
        post: id2
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>Add your opinion to this discussion</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="comment"
                label="Comment"
                type="text"
                id="comment"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Add Comment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

function NewReply(prop) {
  const [isVisible, setIsVisible] = React.useState(false);
  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);
  const { id, id2 } = useParams();
  const initialFormData = Object.freeze({
    title: '',
    content: '',
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .post('categories/' + id + '/posts/' + id2 + '/comments/'+prop.replyID+'/replies/', {
        reply: formData.reply,
        user: localStorage.getItem('user_id'),
        comment: prop.replyID
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {(!isVisible) &&
      <Button size="small" onClick={handleOpen}>Respond </Button>

      }
      {(isVisible) &&
        <Box >
          <Button size="small" onClick={handleClose}>Close </Button>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="reply"
                label="Reply"
                type="text"
                id="reply"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Reply
              </Button>
            </Grid>
          </Grid>
        </Box>
      }

      
    </div>
  );
}

function DeleteComment(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .delete('categories/' + id + '/posts/' + id2 + '/comments/'+prop.commentID+'/', {
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button size='small' onClick={handleOpen}>Delete Comment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Are you sure?
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
function DeleteReply(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .delete('categories/' + id + '/posts/' + id2 + '/comments/'+prop.commentID+'/replies/'+prop.replyID+'/', {
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button size='small' onClick={handleOpen}>Delete Reply</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Are you sure?
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

function EditPost(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: '',
    content: '',
    author:'',
    category:'',
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
			getToken();
},[]);
  const getToken = async () => {
    const response = await axiosInstance.get('categories/' + id + '/posts/'+id2);
    const data = await response.data;
    updateFormData({
      ...formData,
      ['title']: data.title,
      ['content']: data.content,
      ['author']:data.author,
      ['category']:data.category,
      ['post_comment']:data.post_comment,
    });
  };
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .put('categories/' + id + '/posts/'+id2+'/', {
        author:formData.author,
        title: formData.title,
        content: formData.content,
        category:formData.category,
        post_comment:formData.post_comment,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
        <IconButton aria-label="Example" onClick={handleOpen}>
          <EditIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                id="title"
                label="Title name"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="content"
                label="Content"
                type="text"
                id="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Edit post
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

function EditComment(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    user: '',
    comment: '',
    post:'',
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
			getToken();
},[]);
  const getToken = async () => {
    const response = await axiosInstance.get('categories/' + id + '/posts/'+id2+'/comments/'+props.commentID);
    const data = await response.data;
    updateFormData({
      ...formData,
      ['user']: data.user,
      ['comment']: data.comment,
      ['post']:data.post,
    });
  };
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .put('categories/' + id + '/posts/'+id2+'/comments/'+props.commentID+'/', {
        user:formData.user,
        comment: formData.comment,
        post: formData.post,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <IconButton aria-label="Example" onClick={handleOpen}>
          <EditIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="comment"
                label="Comment"
                type="text"
                id="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}


function EditReply(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const initialFormData = Object.freeze({
    user: '',
    reply: '',
    comment:'',
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
			getToken();
},[]);
  const getToken = async () => {
    const response = await axiosInstance.get('categories/' + id + '/posts/'+id2+'/comments/'+props.commentID+'/replies/'+props.replyID);
    const data = await response.data;
    updateFormData({
      ...formData,
      ['user']: data.user,
      ['reply']: data.reply,
      ['comment']:data.comment,
    });
  };
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .put('categories/' + id + '/posts/'+id2+'/comments/'+props.commentID+'/replies/'+props.replyID+'/', {
        user:formData.user,
        comment: formData.comment,
        reply: formData.reply,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <IconButton aria-label="Example" onClick={handleOpen}>
          <EditIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="reply"
                label="Reply"
                type="text"
                id="reply"
                value={formData.reply}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

function SendPrivateMessage(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    message: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .post('personalMessage/', {
        sender: localStorage.getItem('user_id'),
        message: formData.message,
        receiver: props.owner,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <IconButton aria-label="Example" onClick={handleOpen}>
          <MessageIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                id="message"
                label="Message"
                name="message"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
               Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

function DeleteCategory(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .delete('categories/' + prop.id + '/', {
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <IconButton aria-label="Example" onClick={handleOpen}>
          <DeleteIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Are you sure?
          </Button>
        </Box>
      </Modal>
    </>
  );
}

function EditCategory(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const initialFormData = Object.freeze({
    name: '',
    description: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
			getToken();
},[]);
  const getToken = async () => {
    const response = await axiosInstance.get('categories/' + prop.id );
    const data = await response.data;
    updateFormData({
      ...formData,
      ['name']: data.name,
      ['description']: data.description,
    });
  };
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .put('categories/' + prop.id + '/', {
        name:formData.name,
        description: formData.description,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <IconButton aria-label="Example" onClick={handleOpen}>
          <MessageIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="name"
                label="Name"
                type="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="description"
                label="Description"
                type="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
function NewCategory() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, id2 } = useParams();
  const initialFormData = Object.freeze({
    name: '',
    description: '',
  });

  const [formData, updateFormData] = useState(initialFormData);


  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    axiosInstance
      .post('categories/', {
        name:formData.name,
        description: formData.description,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>New Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                id="name"
                label="Category name"
                name="name"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                name="description"
                label="Description"
                type="text"
                id="description"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Create new category
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export {
  NewPost,
  DeletePost,
  NewComment,
  NewReply,
  DeleteComment,
  DeleteReply,
  EditPost,
  EditComment,
  EditReply,
  SendPrivateMessage,
  DeleteCategory,
  EditCategory,
  NewCategory,
}

