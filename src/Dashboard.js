import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Link, 
    Table, 
    Paper, 
    Toolbar, 
    Checkbox, 
    TableRow, 
    TableBody, 
    TableCell, 
    TableHead, 
    IconButton,
    Typography,
    TableSortLabel,
    TablePagination,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { axiosInstance } from './Global';

const useStyles = makeStyles(theme => ({
    add: {
        marginLeft: 'auto',
    },
    selectedHeader: {
        background: 'rgb(250, 224, 233)'
    }
}));

const ReadMoreLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
));

const defaultAttri = {
    results: [], page_size: 0, count: 0
}

const ordering = [
    'asc',
    'desc',
]

function Dashboard(props) {
    console.log("Dashboard");
    const [attri, setAttri] = useState(defaultAttri);
    const [order, setOrder] = useState({id: "", index: 0});
    const [url, setUrl] = useState('/dashboard/list/');
    const [time, setTime] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [checkedArray, setCheckedArray] = useState([]);
    const classes = useStyles();
    const location = useLocation();

    useEffect(()=>{
        axiosInstance
            .get(url)
            .then((response)=>{
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then((data)=>{
                setAttri(data);
            })
            .catch((error)=>{
                console.log(error);
            });

    }, [time, url]);

    const sortFunc = (componentId) => {
        return ((event) => {
            if (order.id !== componentId) {
                setOrder({ id: componentId, index: 0 });
            } else {
                if (order.index + 1 >= ordering.length) {
                    setOrder({ id: '', index: 0 });
                } else {
                    setOrder({ ...order, index: order.index + 1 })
                }
            };
        });
    }

    useEffect(()=>{
        const urlObject = new URLSearchParams(url.split("?")[1]);
        if (order.id === undefined || order.id === "") {
            urlObject.delete('ordering');
        } else {
            let sign = "";
            if (order.index === 1) sign = "-";
            urlObject.set('ordering', sign + order.id);
        }
        // clear controlled component
        setCheckedArray([]);
        setAttri(defaultAttri);
        if (urlObject.toString() === "") {
            setUrl(url.split("?")[0]);
        }
        else {
            setUrl(url.split("?")[0] + '?' + urlObject.toString());
        }
    }, [url, order])

    return (
        <Paper>
            {(() =>
                checkedArray.length > 0 ? (
                    <Toolbar className={classes.selectedHeader}>
                        <Typography variant='h6'>
                            {`${checkedArray.length} selected`}
                        </Typography>
                        <IconButton
                            className={classes.add}
                            onClick={(event)=>{
                                axiosInstance.post('/deleteList/', {'array': checkedArray})
                                    .then((response)=>{
                                        return response.data;
                                    })
                                    .then((data)=>{
                                        axiosInstance.get(data.link)
                                            .then((response)=>{
                                                if (response.status === 202) {
                                                    //clear uncontrolled checkbox
                                                    setCheckedArray([]);
                                                    setAttri(defaultAttri); 
                                                    setTime(Date.now());    
                                                }
                                            })
                                            .catch((error)=>{
                                                console.log(error);
                                            })
                                    })
                                    .catch((error)=>{
                                        console.log(error);
                                    })
                            }}
                            >
                            <DeleteIcon/>
                        </IconButton>
                    </Toolbar>
                ) : (
                    <Toolbar>
                        <Typography variant='h6'>
                            Blogs
                            </Typography>
                        <RouterLink
                            className={classes.add}
                            to={{
                                pathname: '/post/',
                                state: {
                                    from: [location.pathname]
                                }
                            }}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </RouterLink>
                    </Toolbar>
                )
            )()}
            <Table>
                <TableHead>
                    <TableRow>
                       <TableCell>
                            <Checkbox
                                onClick={(event)=>{
                                    if (checkedArray.length === attri.results.length) {
                                        setCheckedArray([]);
                                    } else {
                                        setCheckedArray(attri.results.map((value, index)=>{return value.id}));
                                    }
                                }}
                                checked={(checkedArray.length === attri.results.length)}
                            ></Checkbox>
                        </TableCell>
                        <TableCell id='title' >
                            <TableSortLabel
                                active={order.id === 'title'}
                                direction={ordering[order.index]}
                                onClick={sortFunc('title')}>
                                Title
                            </TableSortLabel>
                        </TableCell>
                        <TableCell id='publish_date' sortDirection='asc' align='right'>
                            <TableSortLabel
                                active={order.id === 'publish_date'}
                                direction={ordering[order.index]}
                                onClick={sortFunc('publish_date')}>
                                Publish Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell id='modified_date' align='right'>
                            <TableSortLabel
                                active={order.id === 'modified_date'}
                                direction={ordering[order.index]}
                                onClick={sortFunc('modified_date')}>
                                Modify Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell id='viewed_times' align='right'>
                            <TableSortLabel
                                active={order.id === 'viewed_times'}
                                direction={ordering[order.index]}
                                onClick={sortFunc('viewed_times')}>
                                Viewed Times
                            </TableSortLabel>
                        </TableCell>
                        <TableCell id='comments_num' align='right'>
                            <TableSortLabel
                                active={order.id === 'comments_num'}
                                direction={ordering[order.index]}
                                onClick={sortFunc('comments_num')}>
                                Comments Number
                            </TableSortLabel>
                        </TableCell>
                        <TableCell id='sticky' align='right'>
                            Sticky?
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attri.results.map((value, index)=>{
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <Checkbox
                                        id={`${value.id}`}
                                        onClick={(event)=>{
                                            const id = value.id;
                                            if (checkedArray.includes(id)) {
                                                const newArray = checkedArray.filter(item => item !== id);
                                                setCheckedArray(newArray);
                                            } else {
                                                setCheckedArray([...checkedArray, id]);
                                            }
                                        }}
                                        checked={checkedArray.includes(value.id)}
                                    ></Checkbox>
                                </TableCell>
                                <TableCell>
                                    <Link 
                                        underline="none"
                                        color="primary"
                                        component={ReadMoreLink}
                                        to={`/posts/${value.id}/`}>
                                        {value.title}
                                    </Link>
                                </TableCell>
                                <TableCell align='right'>{value.publish_date}</TableCell>
                                <TableCell align='right'>{value.modified_date}</TableCell>
                                <TableCell align='right'>{value.viewed_times}</TableCell>
                                <TableCell align='right'>{value.comments_num}</TableCell>
                                <TableCell align='right'>
                                    <Checkbox 
                                        id = {value.id.toString()}
                                        checked={value.sticky} 
                                        onChange={(event)=>{
                                            console.log(event.target.checked)
                                            console.log(event.target.id);
                                            axiosInstance.patch(`/sticky/${value.id}/`, {'sticky': event.target.checked})
                                                .then((response)=>{
                                                    if (response.status === 200) {
                                                        setCheckedArray([]);
                                                        setAttri(defaultAttri);
                                                        setTime(Date.now());
                                                    }
                                                })
                                                .catch((error)=>{
                                                    console.log(error);
                                                });
                                        }}/>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                rowsPerPage={attri.page_size}
                count={attri.count}
                page={pageNum}
                onChangePage={(event, newPage) => {
                    // clear controlled checkbox
                    setCheckedArray([]);
                    setAttri(defaultAttri);
                    if (newPage > pageNum) {
                        setUrl(attri.next);
                    } else {
                        setUrl(attri.previous);
                    }
                    setPageNum(newPage);
                }}
            />
        </Paper>
    );
}

export default Dashboard;