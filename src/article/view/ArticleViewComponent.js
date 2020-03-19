import React, {useEffect, useState} from "react";
import {deleteArticle, getArticle, publishArticle} from "../../service/ArticleService";
import {API_BASE_URL} from "../../service/http/HttpClient";
import {DEFAULT_IMAGE_URL} from "../../constants";
import './ArticleViewComponent.css';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import moment from 'moment';

function ArticleViewComponent({match}) {

    const [articleCore, setArticleCore] = useState({});
    const [currentArticle, setCurrentArticle] = useState();
    const [translation, setTranslation] = useState({});
    const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);

    useEffect(() => {
        const {params} = match;
        getArticle(params.id).then(response => {
            const {data} = response;
            // eslint-disable-next-line
            const mapped = data.translations.reduce((a, b) => (a[b.language] = b, a), {});
            setTranslation(mapped);
            const fistLanguage = Object.keys(mapped)[0];
            if (fistLanguage) {
                setCurrentArticle(mapped[fistLanguage])
            }
            if (data.imageId) {
                setImageUrl(API_BASE_URL + '/image/' + data.imageId);
            }
            delete data.translations;
            setArticleCore(data);
        }).catch(error => {
            console.log('Populate article failed', error)
        });
    }, [match]);


    const onPublishClick = () => {
        publishArticle(match.params.id).catch(error => {
            console.log('Publish article failed', error)
        });
    };

    const onDeleteClick = () => {
        deleteArticle(match.params.id).catch(error => {
            console.log('Delete article failed', error)
        });
    };

    return (
        <div className="article-view-container">
            <div className="article-view-container-column">
                <img alt="article" className="article-image" src={imageUrl}/>
                <div>
                    {
                        Object.keys(translation).map(k => <Button key={k} variant="contained" color="primary"
                                                                  onClick={() => setCurrentArticle(translation[k])}> {k} </Button>)
                    }
                </div>
                {
                    currentArticle && <>
                        <div className="article-title">{currentArticle.title}</div>
                        <div className="article-description">{currentArticle.description}</div>
                        <div className="article-date">Created at: {currentArticle.createdAt}</div>
                        <div className="article-date">Modified at: {currentArticle.modifiedAt}</div>
                        {articleCore.publishedAt &&
                        <div className="article-date">Published at: {articleCore.publishedAt}</div>}
                        <div className="edit-publish-button-group">
                            <Button variant="contained" color="primary" size="medium" component={Link}
                                    to={`/`} onClick={onDeleteClick}>
                                Delete
                            </Button>
                            <Button variant="contained" color="primary" size="medium" component={Link}
                                    to={`/article/edit/${match.params.id}`}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" size="medium" onClick={onPublishClick} disabled={moment(currentArticle.modifiedAt).isBefore(articleCore.publishedAt)}>
                                {moment(currentArticle.modifiedAt).isAfter(articleCore.publishedAt) ? "Re-Publish" : "Publish"}
                            </Button>
                        </div>
                    </>
                }
            </div>
        </div>
    );

}

export default ArticleViewComponent;