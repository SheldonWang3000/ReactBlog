import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Avatar, Container, Divider, Hidden, TablePagination } from '@material-ui/core';
import { axiosInstance } from './Global';
import { makeStyles } from '@material-ui/core/styles';
import CommentInput from './CommentInput';

const useStyles = makeStyles(theme => ({
    block: {
        // marginTop: theme.spacing(1),
    },
    comment: {
        // paddingBottom: theme.spacing(1),
        // paddingLeft: theme.spacing(2),
    },
    son: {
        marginLeft: theme.spacing(4),
    }, 
    list: {
        marginTop: theme.spacing(1),
    }
}));

function Item(props) {
    const classes = useStyles();
    if (props.obj === null) return(<div></div>);
    return (
        <Grid item className={classes.block}>
            <Grid container direction="column">
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Grid item>
                                <Avatar src={props.obj.avatar} />
                            </Grid>
                        </Grid>
                        <Grid item className={classes.comment} >
                            <Grid container direction="row" spacing={1}>
                                <Grid item>
                                    <Typography color="primary">
                                        {props.obj.username}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {props.obj.publish_date}
                                    </Typography>

                                </Grid>
                            </Grid>
                            <Typography>
                                {props.obj.content}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.son}>
                    <Item obj={props.obj.parent_comment}></Item>
                </Grid>
            </Grid>
        </Grid>
    );
}

function CommentList(props) {
    console.log("CommentList");
    const classes = useStyles(); 
    const [attri, setAttri] = useState(Object);
    const [showInput, setShowInput] = useState(-1);
    const [listComment, setListComment] = useState(<div></div>);
    const [listPagination, setListPagination] = useState(<div></div>);
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(props.url);
    useEffect(()=>{
        setUrl(props.url);
    }, [props.url])

    useEffect(() => {
        if (attri.results !== undefined) {
            if (props.url !== undefined && props.url !== "") {
                setListComment(
                    <Container component="div" maxWidth="lg">
                        <Grid className={classes.list} container direction="column" spacing={1}>
                            {attri.results.map((value, index) => {
                                return (
                                    <Grid item key={index}>
                                        <Grid container direction="column">
                                            <Item obj={value}></Item>
                                            <Grid item id={value.id}>
                                                <Typography color="textSecondary" onClick={(e) => {
                                                    if (value.id === showInput) {
                                                        setShowInput(-1);
                                                    } else {
                                                        setShowInput(value.id);
                                                    }
                                                }}>reply</Typography>
                                                <Hidden lgDown={showInput !== value.id}>
                                                    <CommentInput id={value.id} blog={props.blog} />
                                                </Hidden>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        
                    </Container>

                );
            }
        }
    }, [attri, props, classes, showInput]);

    useEffect(() => {
        if (attri.page_size !== undefined && attri.count !== undefined) {
            setListPagination(
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    rowsPerPage={attri.page_size}
                    count={attri.count}
                    page={page}
                    onChangePage={(event, newPage) => {
                        if (newPage > page) {
                            setUrl(attri.next);
                        } else {
                            setUrl(attri.previous);
                        }
                        setPage(newPage);
                    }}
                />
            );
        }
    }, [attri, page]);


    useEffect(()=>{
        axiosInstance.get(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then((data) => {
                setAttri(data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [url]);
    return (
        <Container component="div" maxWidth="xl">
            <Typography variant="h6">
                Comments
            </Typography>
            <Divider />
            <CommentInput blog={props.blog} />
            {listComment}
            {listPagination}
        </Container>
    );
}

export default connect(
    null,
    null
)(CommentList);