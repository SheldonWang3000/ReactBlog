import React from 'react';
import { 
    Redirect,
    Route,
    Switch, 
    BrowserRouter as Router,
} from 'react-router-dom';

import BlogList from './BlogList';
import Detail from "./Detail";
import NotFoundPage from './NotFoundPage';
import PostBlog from './PostBlog';
import LoginVerifyProcess from './LoginVerifyProcess';
import Login from './Login';
import Dashboard from './Dashboard';
import NavigationBar from './NavigationBar';
import DashboardNavigationBar from './DashboardNavigationBar';
import PrivacyPolicy from './PrivacyPolicy';
import Copyright from './Copyright';
import CommentList from './CommentList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    background: theme.palette.primary
}));

function App() {
    const classes = useStyles();
    return (
        <Router>
            <Switch>
                <Route path="/posts/:id">
                    <NavigationBar />
                </Route>
                <Route exact path="/">
                    <NavigationBar />
                </Route>
                <Route path="/post/:id?">
                    <NavigationBar />
                </Route>
                <Route path="/search/:search">
                    <NavigationBar />
                </Route>
                <Route path="/dashboard">
                    <DashboardNavigationBar />
                </Route>

            </Switch>
            <Switch>
                <Route path="/posts/:id">
                    <Detail className={classes.background}/>
                </Route>
                <Route exact path="/">
                    <BlogList/>
                </Route>
                <Route path="/search/:search">
                    <BlogList/>
                </Route>
                <Route path="/404">
                    <NotFoundPage/>
                </Route>
                <Route path="/post/:id?">
                    <LoginVerifyProcess>
                        <PostBlog/>
                    </LoginVerifyProcess>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/dashboard">
                    <LoginVerifyProcess>
                        <Dashboard/>
                    </LoginVerifyProcess>
                </Route>
                <Route path="/test">
                    <CommentList url="https://www.sheldonweb.com/api/v1/comments/blog/1/" blog={1}/>
                    {/* <SocialLogin/> */}
                </Route>
                <Route path="/privacy-policy">
                    <PrivacyPolicy/>
                </Route>
                <Redirect to='/404'/>
            </Switch>
            <Copyright/>
        </Router>
    );
}

export default App;
