import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Grid, Typography, Avatar, Container, Divider, Hidden, TablePagination } from '@material-ui/core';
import { axiosInstance } from './Global';
import { makeStyles } from '@material-ui/core/styles';
import CommentInput from './CommentInput';
import { commentToggleSave, commentToggleClear } from './redux/actions';

const useStyles = makeStyles(theme => ({
    newComment: {
        marginTop: theme.spacing(1)
    },
    comment: {
        flex: '1',
    },
    son: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(4),
    }, 
    container: {
        padding: '0px',
        margin: '0px',
        marginTop: theme.spacing(1),
    }, 
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function Item(props) {
    const classes = useStyles();
    if (props.obj === null) return(<div></div>);
    return (
        <Grid container direction="column">
            <Grid item>
                <Grid container spacing={1} direction="row">
                    <Grid item>
                        <Avatar src={props.obj.avatar} variant="square" />
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
                        <Typography variant="subtitle2" color="textPrimary">
                            {props.obj.content}
                        </Typography>
                        <Link
                            href="#"
                            color="textSecondary"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(props.blog);
                                if (props.obj.id !== props.commentToggleId) {
                                    props.commentToggleSave(props.obj.id);
                                } else {
                                    props.commentToggleClear();
                                }
                            }}
                        >
                            reply
                        </Link>
                        <Hidden lgDown={props.obj.id !== props.commentToggleId}>
                            <CommentInput id={props.obj.id} blog={props.blog} refreshCallback={(value)=>{
                                props.commentToggleClear();
                                console.log(props);
                                props.refreshCallback(value);
                            }} />
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.son}>
                {
                    (() => {
                        if (props.obj.children_comment !== null) {
                            return props.obj.children_comment.map((value, index) => {
                                return <ReduxItem obj={value} key={index} blog={props.blog} refreshCallback={props.refreshCallback}></ReduxItem>;
                            });
                        }
                    })()
                }
            </Grid>
        </Grid>
    );
}
// Map Redux state to component props
function mapStateToProps(state) {
    return state.commentToggleId;
}

// Map Redux actions to component props
const mapDispatchToProps = {
    commentToggleSave,
    commentToggleClear
}

const ReduxItem = connect(
    mapStateToProps,
    mapDispatchToProps 
)(Item);

function CommentList(props) {
    console.log("CommentList");
    const classes = useStyles(); 

    const [attri, setAttri] = useState(Object);
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(props.url);
    const [time, setTime] = useState(0);

    useEffect(()=>{
        setUrl(props.url);
    }, [props.url])

    // request data
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

    }, [url, time]);

    return (
        <Container component="div" maxWidth="xl" className={classes.container}>
            <Typography variant="h6">
                Comments
            </Typography>
            <Divider className={classes.divider}/>
            <CommentInput blog={props.blog} refreshCallback={setTime} />
            {
                (() => {
                    // list
                    if (attri.results !== undefined && props.url !== undefined && props.url !== "") {
                        return (
                            <Grid container direction="column" className={classes.newComment}>
                                {attri.results.map((value, index) => {
                                    return (
                                        <Grid item key={index}>
                                            <ReduxItem obj={value} blog={props.blog} refreshCallback={setTime}></ReduxItem>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        );
                    }
                })()
            }
            
            {
                (()=>{
                    // pagination bar
                    if (attri.page_size !== undefined && attri.count !== undefined && attri.count !== 0) {
                        return(
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
                })()
            }
        </Container>
    );
}

export default CommentList;