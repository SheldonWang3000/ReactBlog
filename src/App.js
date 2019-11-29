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
import { Test, Parent } from './Test';
import LoginVerifyProcess from './LoginVerifyProcess';
import Login from './Login';
import Dashboard from './Dashboard';
import NavigationBar from './NavigationBar';
import DashboardNavigationBar from './DashboardNavigationBar';
import Copyright from './Copyright';


function App() {
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
                    <Detail/>
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
                    <Parent>
                        <Test />
                    </Parent>
                </Route>
                <Redirect to='/404'/>
            </Switch>
            <Copyright/>
        </Router>
    );
}

export default App;
