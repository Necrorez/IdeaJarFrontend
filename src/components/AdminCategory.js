import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
import { DeletePost, NewComment, EditPost, SendPrivateMessage,DeleteCategory,EditCategory, NewCategory } from './ModalForms'
import CommentSection from './CommentSection';
import { CircularProgress } from '@material-ui/core';
import { Navigate } from 'react-router';
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

function IsAdmin(props) {
    const id = props.id;
    if (localStorage.getItem('is_staff') == 'true') {

      return (<><DeleteCategory id={id} /><EditCategory id={id} /></>)
    }
    return <Box></Box>
  }

export default function AdminCategory() {
    const classes = useStyle();
    const navigate =useNavigate();
    const [data, setData] = useState({
        category: []
    });
    useEffect(() => {
        axiosInstance.get('categories').then((res) => {
            setData({
                category: res.data,
            });
        });
    }, [setData])

    if(localStorage.getItem('is_staff')!='true'){
        navigate('/');
    }


    console.log(data.category);

    return (
        <React.Fragment>
            <Box className={classes.defaultStyle}>
            <NewCategory/>

            </Box>
            {data.category.map((content) => (
                <>
                        <Card className={classes.defaultStyle}>
                            <CardHeader
                                title={"Category name: " + content.name}
                               
                            />
                            <CardContent>
                                <Typography variant="h4">
                                    {content.description}
                                </Typography>
                            </CardContent>
                            <CardContent>
                               <IsAdmin id={content.id}/>
                            </CardContent>

                        </Card>
                </>
            ))}


        </React.Fragment>
    )
}