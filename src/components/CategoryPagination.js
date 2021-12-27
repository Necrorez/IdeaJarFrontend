import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
  CardHeader,

} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import {NewPost} from "./ModalForms"

import Pagination from '@mui/material/Pagination';
const useStyles = makeStyles((theme) => ({
  cardStyle: {
    marginTop: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '25%',
      marginRight: '25%'
    },
  },
  paginationStyle: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },

}));

function CategoryPagination() {

  const classes = useStyles();

  const { id } = useParams();

  const [data, setData] = useState({
    posts: [],
  });
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 4;
  const pagesVisited = pageNumber * perPage;

  useEffect(() => {
    axiosInstance.get('categories/' + id + '/posts').then((res) => {
      setData({
        posts: res.data,
      });
    });
  }, [setData])
  console.log(data.posts);
  const displayUsers = data.posts
    .slice(pagesVisited - perPage, pagesVisited)
    .map((post) => {
      return (
        <Box className={classes.cardStyle}>
          <Card>
            <CardActionArea
              component={NavLink}
              to={"/category/" + id + "/post/"+post.id}
            >
              <CardHeader
                title={"By: " + post.author_email}
                subheader={post.published}
              />
              <CardContent>
                <Typography variant="h4" className={classes.paginationStyle} >
                  {post.title}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="p">
                  {post.content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

      );
    });

  const pageCount = Math.ceil(data.posts.length / perPage);

  const changePage = (event, value) => {
    setPageNumber(value);

  };

  return (
    <React.Fragment>
      {(localStorage.getItem('refresh_token') != null) &&
        <Box className={classes.paginationStyle}>
          <NewPost />
        </Box>}
      {displayUsers}
      <Box className={classes.paginationStyle}>

        <Pagination
          count={pageCount}
          page={pageNumber}
          onChange={changePage}
        />
      </Box>
    </React.Fragment>
  );
}
export default CategoryPagination