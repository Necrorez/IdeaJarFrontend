import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { resolvePath, useParams } from 'react-router';
import { makeStyles } from "@material-ui/core";
import {
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Box,
    CardHeader,
    Tooltip,
    CardActions,
    Button

} from '@material-ui/core';
import { NewReply,DeleteComment, DeleteReply,EditComment,EditReply } from './ModalForms';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
const useStyles = makeStyles((theme) => ({
    cardStyle: {
        marginTop: '1rem',
        justifyContent: 'center',
        alignItems: 'center',

    },
    replyStyle: {
        marginTop: '1px',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1rem',
    },
}));


function LoggedStatus(props) {
    const owner = props.isLoggedIn;
    const id = props.commentID;
    if (owner == localStorage.getItem('user_id') || localStorage.getItem('is_staff')=="true") {
      return <DeleteComment commentID={id}/>
    }
    return <Box></Box>
  }
  function LoggedStatusReply(props) {
    const owner = props.isLoggedIn;
    const id = props.commentID;
    const id2 = props.replyID;
    if (owner == localStorage.getItem('user_id') || localStorage.getItem('is_staff')=="true") {
      return <DeleteReply commentID={id} replyID={id2}/>
    }
    return <Box></Box>
  }
  function EditCommentPost(props) {
    const owner = props.isLoggedIn;
    const id = props.commentID;
    const id2 = props.replyID;
    if (owner == localStorage.getItem('user_id') || localStorage.getItem('is_staff')=="true") {
      return <EditComment commentID={id} />
    }
    return <Box></Box>
  }

  function EditReplyPost(props) {
    const owner = props.isLoggedIn;
    const id = props.commentID;
    const id2 = props.replyID;
    if (owner == localStorage.getItem('user_id') || localStorage.getItem('is_staff')=="true") {
      return <EditReply commentID={id} replyID={id2}/>
    }
    return <Box></Box>
  }


export default function CommentSection({ props }) {
    const classes = useStyles();
    const { id, id2 } = useParams();
    const comments = props;
    console.log(comments)

    return (
        <React.Fragment>
            <Box >
                {comments.map((content) => (
                    <>
                        <Card className={classes.cardStyle}>
                            {(content[0].user_role === "True") &&

                                <CardHeader
                                    title={"By: " + content[0].user_email}
                                    subheader={
                                        <Tooltip title="Administrator">
                                            <DiamondIcon fontSize="small" />
                                        </Tooltip>}
                                />
                            }
                            {(content[0].user_role === "False") &&

                                <CardHeader
                                    title={"By: " + content[0].user_email}
                                    subheader={
                                        <Tooltip title="Normal user">
                                            <PersonIcon fontSize="small" />
                                        </Tooltip>}
                                />
                            }

                            <CardContent>
                                {<Typography variant="subtitle1" className={classes.paginationStyle} >
                                    {content[0].comment}
                                </Typography>}
                            </CardContent>
                            {(localStorage.getItem('refresh_token') != null) &&

                            <CardActions>
                                <NewReply replyID={content[0].id}/>
                                <LoggedStatus isLoggedIn={content[0].user} commentID={content[0].id}/>
                                <EditCommentPost isLoggedIn={content[0].user} commentID={content[0].id}/>
                            </CardActions>
                        }

                        </Card>

                        <Box>
                            {content[1].map((reply) => (
                                <Card className={classes.replyStyle}>
                                    {(reply.user_role === "True") &&

                                        <CardHeader
                                            title={"By: " + reply.user_email}
                                            subheader={
                                                <Tooltip title="Administrator">
                                                    <DiamondIcon fontSize="small" />
                                                </Tooltip>}
                                        />
                                    }
                                    {(reply.user_role === "False") &&

                                        <CardHeader
                                            title={"By: " + reply.user_email}
                                            subheader={
                                                <Tooltip title="Normal user">
                                                    <PersonIcon fontSize="small" />
                                                </Tooltip>}
                                        />
                                    }
                                    <CardContent>
                                        {<Typography variant="subtitle1" className={classes.paginationStyle} >
                                            {reply.reply}
                                        </Typography>}
                                    </CardContent>
                                    {(localStorage.getItem('refresh_token') != null) &&
                                    <CardActions>
                                    <LoggedStatusReply isLoggedIn={reply.user} commentID={content[0].id} replyID={reply.id}/>
                                    <EditReplyPost isLoggedIn={reply.user} commentID={content[0].id} replyID={reply.id}/>
                                    </CardActions>
                                      }
                                </Card>
                            ))}
                        </Box>
                    </>
                ))}

            </Box>
        </React.Fragment>
    );
}

