import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import ArticleContainer from "./article/publish/container/ArticleCreateEditContainer";
import ArticleViewComponent from "./article/view/ArticleViewComponent";


const routes = (
    <Router>
        <HeaderComponent/>
        <Switch>
            <Route exact path="/article/create" component={ArticleContainer}/>
            <Route exact path="/article/edit/:id" component={ArticleContainer}/>
            <Route exact path="/article/:id" component={ArticleViewComponent}/>
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
