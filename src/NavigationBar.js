import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    header: {
        paddingBottom: '64px'
    },
    loginMsg: {
        textAlign: 'right',
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

function NavigationBar(props) {
    console.log('NavigationBar');
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <AppBar position='fixed' >
                <Toolbar>
                    <Typography variant="h5"className={classes.title}>
                        Sheldon's Blog
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={(event)=>{
                                if (event.keyCode=== 13)
                                {
                                    console.log(event.target.value);
                                }
                            }}
                            onBlur={(event) => { event.target.value = ""; }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavigationBar;
