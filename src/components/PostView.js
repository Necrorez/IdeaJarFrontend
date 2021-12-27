import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
import { DeletePost, NewComment, EditPost, SendPrivateMessage } from './ModalForms'
import CommentSection from './CommentSection';
import { CircularProgress } from '@material-ui/core';
import {
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Box,
    CardHeader,
    Grid,

} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { Tooltip } from '@mui/material';

const useStyle = makeStyles((theme) => ({
    cardStyle: {
        marginTop: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right bottom, #0d2438, #b5c6d4)',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        borderRadius: '16px 16px 0 0',
        color: 'white',
        [theme.breakpoints.up('lg')]: {
            marginLeft: '15%',
            marginRight: '15%'
        },
    },
    defaultStyle: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        [theme.breakpoints.up('lg')]: {
            marginLeft: '15%',
            marginRight: '15%'
        },
    },
    gridStyle: {
        marginTop: '0.01rem',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        [theme.breakpoints.up('lg')]: {
            marginLeft: '15%',
            marginRight: '15%',

        },
    },
    gridStyle2: {
        marginTop: '0.01rem',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    mainTextStyle: {
        marginTop: '1rem',
        justifyContent: 'top',
        alignItems: 'left',
        textAlign: 'left',
        [theme.breakpoints.up('lg')]: {
            marginRight: '80%'
        },
    },

}));

function LoggedStatus(props) {
    const owner = props.isLoggedIn;
    const id = props.commentID;
    if (owner == localStorage.getItem('user_id') || localStorage.getItem('is_staff')=="true") {

      return (<><DeletePost /> <EditPost/></>)
    }
    return <Box></Box>
  }

  function PrivateMessage(props) {
    const owner = props.isLoggedIn;
    const sender = props.senderID;
    if (owner != localStorage.getItem('user_id') && localStorage.getItem('refresh_token') != null) {

      return (<><SendPrivateMessage owner={owner} /></>)
    }
    return <Box></Box>
  }

export default function PostView() {
    const classes = useStyle();

    const { id, id2 } = useParams();
    const [data, setData] = useState({
        post: []
    });
    useEffect(() => {
        axiosInstance.get('categories/' + id + '/posts/' + id2).then((res) => {
            setData({
                post: res.data,
            });
        });
    }, [setData])
    const [prop, setProp] = useState({
        comments: []
    });
    const [replies, setReply] = useState([]);

    useEffect(() => {
        axiosInstance.get('categories/' + id + '/posts/' + id2 + '/comments/').then((res) => {
            setProp({
                comments: res.data,
            });
            return Promise.all(res.data.map((comment) => {

                axiosInstance.get('categories/' + id + '/posts/' + id2 + '/comments/' + comment.id + '/replies').then((res) => {
                    setReply(replies =>
                        [...replies,[comment, res.data]]
                    );
                });
            }))
        })


    }, [])

    


    return (
        <React.Fragment>
            <Box className={classes.cardStyle}>
                <Typography noWrap variant="h4" align='center'   >
                    {data.post.title}
                </Typography>
            </Box>
            <Box className={classes.gridStyle}>
            <Grid container spacing={2} className={classes.gridStyle2}>
                <Grid item lg={2} sm={3} marginRight='0.5rem'>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="poster" align='left'  >
                                By:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="poster" align='left' >
                                {(data.post.author_role == "True") &&
                                    <Tooltip title="Administrator">
                                        <DiamondIcon fontSize="small" />
                                    </Tooltip>
                                }
                                {(data.post.author_role == "False") &&
                                    <Tooltip title="Normal user">
                                        <PersonIcon fontSize="small" />

                                    </Tooltip>
                                }
                            </Typography>
                        </Grid>


                    </Grid>
                    <Typography variant="poster" align='left'  >
                        {data.post.author_email}
                    </Typography>
                    <Box>
                        <Typography variant="poster" align='left'  >
                            Date:
                        </Typography>
                    </Box>
                    <Typography variant="poster" align='left'  >
                        {data.post.published}
                    </Typography>
                  < LoggedStatus isLoggedIn={data.post.author}/>
                  < PrivateMessage isLoggedIn={data.post.author}/>
                </Grid>
                <Grid item lg={10} sm={9} >
                    <Typography variant="poster" align='left'   >
                        {data.post.content}
                    </Typography>

                </Grid>
            </Grid>
            </Box>
            {(localStorage.getItem('refresh_token') != null) &&
            <Box className={classes.defaultStyle}>
                <NewComment />
            </Box>
}
            <Box className={classes.defaultStyle}>
                {(replies.length >0) &&
                    <CommentSection props={replies} />

                }
                {(replies.length === 0) &&
                    <CircularProgress color="secondary" />

                }
            </Box>

        </React.Fragment>
    )
}