import React from 'react'
import { 
    Route,
    Switch, 
    BrowserRouter as Router 
} from 'react-router-dom'


import BlogList from './BlogList'
import Detail from "./Detail"
import NotFoundPage from './NotFoundPage'
import CreateBlog from './CreateBlog'

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
                <Route path="/create">
                    <CreateBlog/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
