import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography, Paper, TablePagination, Container, Link } from '@material-ui/core';

import { axiosInstance } from './Global';
import { homePageNext, homePagePrev } from './redux/actions';

const useStyles = makeStyles(theme => ({
    list: {
    },
    content: {
        padding: theme.spacing(5),
    },
    item: {
        margin: theme.spacing(1, 0), 
        borderRadius: theme.shape.borderRadius,
    },
    link: {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(1, 5),
        textTransform: 'uppercase',
    }
}));

const ReadMoreLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
));

function Item(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.item}>
            <Container component="div" className={classes.content} maxWidth='md'>
                <Typography variant='h5'>
                    {props.title}
                </Typography>
                <Typography variant='subtitle2' color="textSecondary">
                    {props.publishDate}
                </Typography>
                <br/>
                <Typography noWrap variant='body1' color="textSecondary">
                    {props.abstract}
                </Typography>
            </Container>
            <Typography className={classes.link}>
                <Link 
                    underline="none"
                    color="secondary" 
                    component={ReadMoreLink} 
                    to={`/posts/${props.id}/`}>
                    Read more...
                </Link>
            </Typography>
        </Paper>
    );
}

function BlogList(props) {

    const classes = useStyles();
    const [attri, setAttri] = useState({
        blogArray: [],
        blogNum: 0,
        pageSize: 0
    });

    const url = `/list/?page=${props.currentPageNum + 1}`;

    useEffect(() => {
        axiosInstance.get(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then((data) => {
                setAttri({
                    blogArray: data.results,
                    blogNum: data.count,
                    pageSize: data.page_size
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [url]);

    return (
        <Container maxWidth="md" component="main">
            <Grid container
                className={classes.list}
                direction="column"
                alignItems="stretch">
                {attri.blogArray.map((value, index) => {
                    return <Item key={index}
                        id={value.id}
                        title={value.title}
                        publishDate={value.publish_date}
                        abstract={value.abstract === undefined ? "Abstrat" : value.abstract}
                    />;
                })}
            </Grid>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                rowsPerPage={attri.pageSize}
                count={attri.blogNum}
                page={attri.blogNum * attri.pageSize === 0 ? 0 : props.currentPageNum}
                onChangePage={(event, newPage) => {
                    if (newPage > props.currentPageNum) {
                        props.homePageNext();
                    }
                    else {
                        props.homePagePrev();
                    }
                }}
            />
        </Container>
    )
}

// Map Redux state to component props
function mapStateToProps(state) {
  return state.homePagination;
}

// Map Redux actions to component props
const mapDispatchToProps = {
    homePageNext,
    homePagePrev
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList);