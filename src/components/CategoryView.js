import React from 'react'
import { 
    Typography,
    Card,
    CardContent,
    CssBaseline,
    CardActionArea,
    Box,
    
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles((theme) =>({
    cardStyle:{
        marginTop:'1rem',
        justifyContent:'center', 
        alignItems:'center',
        [theme.breakpoints.up('lg')]: {
            marginLeft:'25%',
            marginRight:'25%'
          },
    },
    amountStyle:{
        justifyContent:'bottom', 
        textAlign:'right',
        fontsize: '1.2rem',
    },
}));


const CategoryView = (props) => {
    const {categories} = props;
    
    const classes = useStyle();

    
    if (!categories || categories.length === 0) return (<p>Can not find any posts, sorry</p>);
    return (
        <React.Fragment>
            <Box className={classes.cardStyle}>
            <Typography variant="h3">
            Welcome to Jar of Ideas
            </Typography>
            <Typography>
            This website is for people who like collaborating and are looking for funding.
            We really hope that everyone's' dreams of becoming a unicorn startup company.
            </Typography>
            </Box>
            
            <CssBaseline/>
            {categories.map((content)=> (
                <Card className={classes.cardStyle}>
                    <CardActionArea 
                    component={NavLink}
                    to={"/category/"+content.id}
                    >
                <CardContent>
                    <Typography variant="h4">
                        {content.name}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography>
                        {content.description}
                    </Typography>
                </CardContent>
                <CardContent className={classes.amountStyle}>
                    <Typography variant='p'>
                       Amount of post: {content.post.length}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
            ))}
            
        </React.Fragment>
    )
}

export default CategoryView
