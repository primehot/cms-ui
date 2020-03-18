import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import ArticleContainer from "./article/publish/container/ArticleContainer";


const routes = (
    <Router>
        <HeaderComponent/>
        <Switch>
            <Route exact path="/" component={ArticleContainer}/>
        </Switch>
    </Router>
);

function App() {
    return (
        <div>
            <CssBaseline/>
            {routes}
        </div>
    );
}

export default App;
