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
    defaultStyle: {
        marginTop: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign:'center',
        [theme.breakpoints.up('lg')]: {
            marginLeft: '15%',
            marginRight: '15%'
        },
    },

}));



export default function Messages() {
    const classes = useStyle();

    const [data, setData] = useState({
        message: []
    });
    useEffect(() => {
        axiosInstance.get('personalMessage').then((res) => {
            setData({
                message: res.data,
            });
        });
    }, [setData])



    console.log(data.message);

    return (
        <React.Fragment>
            {data.message.map((content) => (
                <>
                    {(content.receiver == localStorage.getItem('user_id')) &&
                        <Card className={classes.defaultStyle}>
                            <CardHeader
                                title={"From: " + content.author_email}
                               
                            />
                            <CardContent>
                                <Typography variant="h4">
                                    {content.message}
                                </Typography>
                            </CardContent>

                        </Card>
                    }
                </>
            ))}


        </React.Fragment>
    )
}