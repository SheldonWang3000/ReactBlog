import React from 'react'
import { 
    Route,
    Switch, 
    BrowserRouter as Router 
} from 'react-router-dom'


import BlogList from './BlogList'
import Detail from "./Detail"

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/posts/:id">
                    <Detail/>
                </Route>
                <Route path="/">
                    <BlogList/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
