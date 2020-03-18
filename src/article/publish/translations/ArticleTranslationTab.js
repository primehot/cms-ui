import React, {useEffect, useState} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './ArticleTranslationTab.css'
import Paper from "@material-ui/core/Paper";
import ArticleForm from "../form/ArticleForm";
import Button from "@material-ui/core/Button";
import {TAB_DEFAULT_NAME} from "../../../constants";

function ArticleTranslationTab({translations, onTranslationChangeCallback}) {

    const [article, setArticle] = useState();
    const [tabPosition, setTabPosition] = useState(0);
    const [tabPositionNames, setTabPositionNames] = useState([]);

    useEffect(() => {
        if (translations.length > 0) {
            setTabPositionNames(translations.map(article => article.language));
            const newTranslationIndex = translations.findIndex(tr => !tr.language);
            if (newTranslationIndex > -1) {
                setTabPosition(newTranslationIndex);
            } else if (tabPosition >= translations.length) {
                setTabPosition(translations.length - 1)
            }
        }
    }, [translations]);

    useEffect(() => {
        if (translations.length > 0) {
            const artoicle = translations[tabPosition];
            setArticle(artoicle);
        }
    }, [tabPosition, translations]);

    const onTabChange = (event, newValue) => {
        // if (tabPosition !== TABLE_DEFAULT_POSITION) {
        setTabPosition(newValue)
        // }
    };

    const onArticleChangeCallback = (changes) => {
        const updatedArticle = {...article, ...changes};
        const updatedTranslation = {...translations[tabPosition], ...updatedArticle};
        const copiedTranslations = translations.slice(0);
        copiedTranslations[tabPosition] = updatedTranslation;
        onTranslationChangeCallback(copiedTranslations)
    };

    const onTranslationRemove = () => {
        if (translations.length < 2) {
            onTranslationChangeCallback([]);
            return;
        }
        const copiedTranslations = translations.slice(0);
        copiedTranslations.splice(tabPosition, 1);
        onTranslationChangeCallback(copiedTranslations);
    };

    return (
        <>
            {translations.length > 0 &&
            <div style={{maxWidth: '520px'}}>
                <Paper square>
                    <Tabs
                        value={tabPosition}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={onTabChange}
                    >
                        {tabPositionNames.map((name, index) =>
                            <Tab key={index} value={index} label={name ? name : TAB_DEFAULT_NAME}/>)}
                    </Tabs>
                </Paper>
                <ArticleForm article={article} onChangeCallback={onArticleChangeCallback}>
                    <Button variant="contained" color="secondary" size="medium" onClick={onTranslationRemove}>
                        Remove
                    </Button>
                </ArticleForm>
            </div>
            }
        </>
    );
}

export default ArticleTranslationTab;