import React, {useEffect, useState} from "react";
import {getArticle} from "../../service/ArticleService";
import {API_BASE_URL} from "../../service/http/HttpClient";
import {DEFAULT_IMAGE_URL} from "../../constants";
import './ArticleViewComponent.css';
import Button from "@material-ui/core/Button";

function ArticleViewComponent({match}) {

    const [article, setArticle] = useState();
    const [translation, setTranslation] = useState({});
    const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);

    console.log(match)
    useEffect(() => {
        const {params} = match;
        getArticle(params.id).then(response => {
            const {data} = response;
            const mapped = data.translations.reduce((a, b) => (a[b.language] = b, a), {});
            setTranslation(mapped);
            const fistLanguage = Object.keys(mapped)[0];
            if(fistLanguage) {
                setArticle(mapped[fistLanguage])
            }
            if (data.imageId) {
                setImageUrl(API_BASE_URL + '/image/' + data.imageId);
            }
        })
    }, [match]);


    return (
        <div className="article-view-container">
            <img className="article-image" src={imageUrl}/>
            <div>
                {
                    Object.keys(translation).map(k => <Button variant="contained" color="primary"
                                                              onClick={() => setArticle(translation[k])}> {k} </Button>)
                }
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
                </>
            }
        </div>
    );

}

export default ArticleViewComponent;