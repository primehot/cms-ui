import React, {useEffect, useState} from "react";
import './ArticleContainer.css';
import ArticleForm from "../form/ArticleForm";
import CreateEditTranslations from "../translations/ArticleTranslationTab";
import Button from "@material-ui/core/Button";
import {setAvailableLanguages} from "../../../store/action/languageAction";
import {connect} from "react-redux";
import {LANGUAGES} from "../../../constants";
import ArticleImageUploadView from "../image/AricleImageUploadView";
import {postArticle} from "../../../service/ArticleService";

function ArticleContainer({setAvailableLanguages}) {

    const [mainArticleDetails, setMainArticleDetails] = useState({});
    const [articleTranslations, setArticleTranslations] = useState([]);
    const [addTranslationDisabled, setAddTranslationDisabled] = useState(false);
    const [imageId, setImageId] = useState();

    useEffect(() => {
        if(mainArticleDetails) {
            const usedLanguage = articleTranslations.map(({language}) => language);
            usedLanguage.push(mainArticleDetails.language);
            const unusedLanguages = LANGUAGES.filter(language => !usedLanguage.includes(language));
            setAvailableLanguages(unusedLanguages);
            setAddTranslationDisabled(!mainArticleDetails.language || articleTranslations.filter(el => !el.language).length > 0 || unusedLanguages.length === 0);
        }
    }, [mainArticleDetails, articleTranslations]);

    const onMainArticleChangeCallback = (changes) => {
        const updatedArticle = {...mainArticleDetails, ...changes};
        setMainArticleDetails(updatedArticle);
    };

    const addNewTranslation = () => {
        setArticleTranslations(articleTranslations.concat([{}]));
    };

    const onTranslationChangeCallback = (updatedTranslations) => {
        setArticleTranslations(updatedTranslations);
    };

    const afterSubmission = (event) => {
        event.preventDefault();
        const translations = articleTranslations.slice(0);
        translations.unshift(mainArticleDetails);
        const article = {translations, imageId};
        postArticle(article).then(response => {
            console.log(response)
        });
    };

    const onPublishClick = () => {

    };

    return (
        <form onSubmit={afterSubmission}>
            <div className="article-publish-container">
                <div className="article-publish-container-data">
                    <ArticleImageUploadView onImageUpload={setImageId}/>
                </div>
                <div className="article-publish-container-data">

                    <ArticleForm article={mainArticleDetails} onChangeCallback={onMainArticleChangeCallback}>
                        <Button variant="contained" color="secondary" size="medium" onClick={addNewTranslation} disabled={addTranslationDisabled}>
                            Add translation
                        </Button>
                    </ArticleForm>

                    <CreateEditTranslations translations={articleTranslations}
                                            onTranslationChangeCallback={onTranslationChangeCallback}/>
                </div>
                <div className="article-publish-container-form-buttons">
                    <Button variant="contained" color="primary" size="medium" type="submit">
                        Send
                    </Button>
                    <Button variant="contained" color="secondary" size="medium" onClick={onPublishClick}>
                        Publish
                    </Button>
                </div>
            </div>
        </form>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setAvailableLanguages: payload => dispatch(setAvailableLanguages(payload)),
});

export default connect(null, mapDispatchToProps)(ArticleContainer);