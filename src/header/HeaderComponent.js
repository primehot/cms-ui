import React from "react";
import {Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import './HeaderComponent.css';

function HeaderComponent() {

    return (
        <div className='binance-c-header'>
            <div className='binance-c-header-content'>
                <Link className='binance-c-header-title' to="/">Binance CMS</Link>
                <Button
                    component={Link} to="/article/create"
                    variant="contained"
                    color="primary"
                >
                    Add new Article
                </Button>
            </div>
        </div>
    );
}

export default HeaderComponent;