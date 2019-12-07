import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

function Copyright() {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link to='/' color="inherit">
                    Sheldon's Blog
            </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <Link to='/privacy-policy'>
                    Privacy Policy
                </Link>
            </Typography>


        </div>
    );
}

export default Copyright; 