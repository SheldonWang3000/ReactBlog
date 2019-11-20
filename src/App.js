import React from 'react';
import { 
    Redirect,
    Route,
    Switch, 
    BrowserRouter as Router 
} from 'react-router-dom';


import BlogList from './BlogList';
import Detail from "./Detail";
import NotFoundPage from './NotFoundPage';
import PostBlog from './PostBlog';
import Test from './Test';
import Login from './Login';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/posts/:id">
                    <Detail/>
                </Route>
                <Route exact path="/">
                    <BlogList/>
                </Route>
                <Route path="/404">
                    <NotFoundPage/>
                </Route>
                <Route path="/post/:id?">
                    <PostBlog/>
                </Route>
                <Route path="/test">
                    <Login/>
                </Route>
                <Redirect to='/404'/>
            </Switch>
        </Router>
    );
}

export default App;
