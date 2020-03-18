import React, {useState} from "react";
import './ArticleContainer.css';
import ArticleForm from "../form/ArticleForm";
import CreateEditTranslations from "../translations/ArticleTranslationTab";
import Button from "@material-ui/core/Button";
import {TABLE_DEFAULT_POSITION} from "../../../constants/tableConstant";

function ArticleContainer() {

    const [mainArticleDetails, setMainArticleDetails] = useState();
    const [articleTranslations, setArticleTranslations] = useState();

    const onMainArticleChangeCallback = (changes) => {
        const updatedArticle = {...mainArticleDetails, ...changes};
        console.log({updatedArticle});
        setMainArticleDetails(updatedArticle);
    };

    const addNewTranslation = () => {
        const n = {...articleTranslations, ...{[TABLE_DEFAULT_POSITION]: null}};
        console.log(n)
        setArticleTranslations(n);
    };

    const onTranslationChangeCallback = () => {
        setArticleTranslations();
    };

    const afterSubmission = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={afterSubmission}>
            <div className="article-publish-container">
                <div className="article-publish-container-data">
                    <ArticleForm article={mainArticleDetails} onChangeCallback={onMainArticleChangeCallback}>
                        <Button variant="contained" color="secondary" size="medium" onClick={addNewTranslation}>
                            Add translation
                        </Button>
                    </ArticleForm>

                    <CreateEditTranslations translations={articleTranslations} onTranslationChangeCallback={onTranslationChangeCallback}/>
                </div>
            </div>
            <Button variant="contained" color="primary" size="medium" type="submit">
                Send
            </Button>
        </form>
    );

}

export default ArticleContainer;