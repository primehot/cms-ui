import React, {useEffect, useState} from "react";
import './ArticleCreateEditContainer.css';
import ArticleForm from "../form/ArticleForm";
import CreateEditTranslations from "../translations/ArticleTranslationTab";
import Button from "@material-ui/core/Button";
import {setAvailableLanguages} from "../../../store/action/languageAction";
import {connect} from "react-redux";
import {LANGUAGES} from "../../../constants";
import ArticleImageUploadView from "../image/AricleImageUploadView";
import {getArticle, postArticle, putArticle} from "../../../service/ArticleService";
import {Prompt} from "react-router-dom";

function ArticleCreateEditContainer({setAvailableLanguages, history, match}) {

    const [articleCore, setArticleCore] = useState();
    const [mainArticleDetails, setMainArticleDetails] = useState({});
    const [articleTranslations, setArticleTranslations] = useState([]);
    const [addTranslationDisabled, setAddTranslationDisabled] = useState(false);
    const [imageId, setImageId] = useState();
    const [shouldLeave, setShouldLeave] = useState(false);

    useEffect(() => {
        const {params} = match;
        if(params.id) {
            getArticle(params.id).then(response => {
                const {data} = response;
                const {translations} = data || {};
                setMainArticleDetails(translations.pop());
                setArticleTranslations(translations);
                delete data.translations;
                setArticleCore(data);
                setImageId(data.imageId)
            })
        } else {
            setMainArticleDetails({});
            setArticleTranslations([]);
            setArticleCore();
            setImageId()
        }
    }, [match]);

    useEffect(() => {
        if (mainArticleDetails) {
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
        setShouldLeave(true)
    };

    const addNewTranslation = () => {
        setArticleTranslations(articleTranslations.concat([{}]));
        setShouldLeave(true)
    };

    const onTranslationChangeCallback = (updatedTranslations) => {
        setArticleTranslations(updatedTranslations);
        setShouldLeave(true)
    };

    const afterSubmission = (event) => {
        event.preventDefault();
        const translations = articleTranslations.slice(0);
        translations.unshift(mainArticleDetails);
        const article = {translations, imageId};
        if (articleCore) {
            putArticle(articleCore.id, article).then(() => {
                setShouldLeave(false);
                history.push(`/article/${articleCore.id}`);
            });
        } else {
            postArticle(article).then(response => {
                setShouldLeave(false);
                history.push(`/article/${response.data.id}`);
            });
        }
    };

    return (
        <form onSubmit={afterSubmission}>
            <div className="article-publish-container">
                <div className="article-publish-container-data">
                    <ArticleImageUploadView imageId={imageId} onImageUpload={setImageId}/>
                </div>
                <div className="article-publish-container-data">

                    <ArticleForm article={mainArticleDetails} onChangeCallback={onMainArticleChangeCallback}>
                        <Button variant="contained" color="secondary" size="medium" onClick={addNewTranslation}
                                disabled={addTranslationDisabled}>
                            Add translation
                        </Button>
                    </ArticleForm>

                    <CreateEditTranslations translations={articleTranslations}
                                            onTranslationChangeCallback={onTranslationChangeCallback}/>
                </div>
                <div className="article-publish-container-form-buttons">
                    <Button variant="contained" color="primary" size="medium" type="submit">
                        Save
                    </Button>
                </div>
                <Prompt
                    when={shouldLeave}
                    message="You have not saved changes. Are you sure you want to leave?"
                />
            </div>
        </form>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setAvailableLanguages: payload => dispatch(setAvailableLanguages(payload)),
});

export default connect(null, mapDispatchToProps)(ArticleCreateEditContainer);