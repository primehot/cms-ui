import React, {useEffect, useState} from "react";
import {getArticle} from "../../service/ArticleService";
import {API_BASE_URL} from "../../service/http/HttpClient";
import {DEFAULT_IMAGE_URL} from "../../constants";
import './ArticleViewComponent.css';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

function ArticleViewComponent({match}) {

    const [article, setArticle] = useState();
    const [translation, setTranslation] = useState({});
    const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);

    useEffect(() => {
        const {params} = match;
        getArticle(params.id).then(response => {
            const {data} = response;
            const mapped = data.translations.reduce((a, b) => (a[b.language] = b, a), {});
            setTranslation(mapped);
            const fistLanguage = Object.keys(mapped)[0];
            if (fistLanguage) {
                setArticle(mapped[fistLanguage])
            }
            if (data.imageId) {
                setImageUrl(API_BASE_URL + '/image/' + data.imageId);
            }
        })
    }, [match]);


    const onPublishClick = () => {

    };

    return (
        <div className="article-view-container">
            <div className="article-view-container-row">
                <img alt="article" className="article-image" src={imageUrl}/>
                <div>
                    {
                        Object.keys(translation).map(k => <Button key={k} variant="contained" color="primary"
                                                                  onClick={() => setArticle(translation[k])}> {k} </Button>)
                    }
                </div>
            </div>
            {
                article && <>
                    <div className="article-title">
                        {article.title}
                    </div>
                    <div className="article-description">
                        {article.description}
                    </div>
                    <div className="article-date">
                        Created at: {article.createdAt}
                    </div>
                    <div className="article-date">
                        Modified at: {article.modifiedAt}
                    </div>
                    {article.publishedAt && <div className="article-date">
                        Published at: {article.publishedAt}
                    </div>
                    }
                    <Button variant="contained" color="primary" size="medium" component={Link} to={`/article/edit/${match.params.id}`}>
                        Edit
                    </Button>
                </>
            }
            <Button variant="contained" color="secondary" size="medium" onClick={onPublishClick}>
                Publish
            </Button>
        </div>
    );

}

export default ArticleViewComponent;