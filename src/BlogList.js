import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import { axiosInstance } from './Global';
import { homePageNext, homePagePrev } from './redux/actions';

const useStyles = makeStyles(theme => ({
    list: {
        // marginTop: theme.spacing(10),
    },
    item: {
      padding: theme.spacing(3, 2),
    },
}));

function Item(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.item}>
            <Link to={`/posts/${props.id}/`}>
                <Typography variant='h6'>
                    {props.title}
                </Typography>
            </Link>
            <Typography variant='subtitle2' color="textSecondary">
                {props.publishDate}
            </Typography>
        </Paper>
    )
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
        <div>
            <Grid container
                className={classes.list}
                direction="column"
                alignItems="stretch">
                {attri.blogArray.map((value, index) => {
                    return <Item key={index}
                        id={value.id}
                        title={value.title}
                        publishDate={value.publish_date}
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
            <Link to='/dashboard'>test</Link>
            <br/>
            <Link to='/post/'>create</Link>
        </div>
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