import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { clearToken } from './redux/actions';
import { axiosInstance } from './Global';

function Dashboard(props) {
    const history = useHistory();
    return (
        <div>
            <Link to='/'>Blog List</Link>
            <br />
            <Link to='/post'>Create Blog</Link>
            <br />
            <Button
                variant="contained" color="secondary"
                onClick={(event) => {
                    clearToken();
                    axiosInstance.defaults.headers.common['Authorization'] = "";
                    history.push('/');
                }} >
                Sign Out
            </Button>
        </div>
    );
}

// Map Redux state to component props
function mapStateToProps(state) {
    return state.loginToken;
}

// Map Redux actions to component props
const mapDispatchToProps = {
    clearToken,
}

// Connected Component
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);