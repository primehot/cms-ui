import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import ArticleForm from "./article/publish/form/ArticleForm";

const routes = (
    <Router>
        <HeaderComponent/>
        <Switch>
            <Route exact path="/" component={ArticleForm}/>
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
