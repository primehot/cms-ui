import React from "react";
import {TextField} from "@material-ui/core";
import './ArticleForm.css'
import {connect} from "react-redux";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

function ArticleForm({article, onChangeCallback, availableLanguages, children}) {

    const {language, title, description} = article || {};

    return (
        <div className="article-publish-form">
            <InputLabel>Language</InputLabel>
            <Select
                native
                required
                value={language || ''}
                onChange={(event) => onChangeCallback({language: event.target.value})}
            >
                <option value="">Not defined</option>
                {language && <option value={language}>{language}</option>}
                {availableLanguages.map((lng, index) => <option key={index} value={lng}>{lng}</option>)}
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