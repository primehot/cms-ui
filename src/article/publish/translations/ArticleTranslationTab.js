import React, {useEffect, useState} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './ArticleTranslationTab.css'
import Paper from "@material-ui/core/Paper";
import ArticleForm from "../form/ArticleForm";
import {TABLE_DEFAULT_POSITION} from "../../../constants/tableConstant";
import Button from "@material-ui/core/Button";

function ArticleTranslationTab({translations, onTranslationChangeCallback}) {

    const [article, setArticle] = useState();
    const [tabPosition, setTabPosition] = useState(TABLE_DEFAULT_POSITION);
    const [tabPositions, setTabPositions] = useState();

    useEffect(() => {
        if (translations) {
            console.log(Object.keys(translations))
            setTabPositions(Object.keys(translations));
        }
    }, [translations]);

    useEffect(() => {
        if (translations) {
            setArticle(translations[tabPosition]);
        }
    }, [tabPosition, translations]);

    const onTabChange = (event, newValue) => {
        if (tabPosition !== TABLE_DEFAULT_POSITION) {
            setTabPosition(newValue)
        }
    };

    const onArticleChangeCallback = () => {

    };

    const onTranslationRemove = () => {

    };

    return (
        <>
            {!!translations &&
            <div>
                <Paper square>
                    <Tabs
                        value={tabPosition}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={onTabChange}
                    >
                        {tabPositions && tabPositions.map((position, index) =>
                            <Tab key={index} value={position} label={position}/>)}
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