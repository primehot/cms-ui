import React from "react";
import {Select, TextField} from "@material-ui/core";
import './ArticleForm.css'
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {connect} from "react-redux";

function ArticleForm({article, onChangeCallback, availableLanguages, children}) {

    const {language, title, description} = article || {};

    return (
        <div className="article-publish-form">
            <Select
                required
                value={language || ''}
                onChange={(event) => onChangeCallback({language: event.target.value})}
            >
                {language && <MenuItem value={language}>{language}</MenuItem>}
                {availableLanguages.map((lng, index) => <MenuItem key={index} value={lng}>{lng}</MenuItem>)}
            </Select>
            {!language && <FormHelperText>This is required!</FormHelperText>}
            <TextField
                required
                label="Title"
                margin="normal"
                value={title || ''}
                onChange={(event) => onChangeCallback({title: event.target.value})}
                inputProps={{maxLength: 12}}
            />
            <TextField
                required
                label="Description"
                margin="normal"
                value={description || ''}
                onChange={(event) => onChangeCallback({description: event.target.value})}
                multiline
                rows="20"
                inputProps={{maxLength: 500}}
            />

            {
                children
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        availableLanguages: state.availableLanguages
    };
};

export default connect(mapStateToProps, null)(ArticleForm);