import React, {useEffect, useState} from "react";
import Pagination from '@material-ui/lab/Pagination'
import {getAllArticle} from "../service/ArticleService";
import ArticleCard from "../article/card/ArticleCard";
import './ArticleMainView.css';

const PAGE_SIZE = 10;

function ArticleMainView({history}) {

    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getAllArticle(activePage - 1, PAGE_SIZE)
            .then(({data}) => {
                const {totalPages, content} = data;
                setTotalPages(totalPages);
                setArticles(content)
            }).catch(error => {
            console.log('Populate articles failed', error)
        });
    }, [activePage]);

    return (
        <div className="article-main-view">
            <div className="cards-view">
                {articles.map((article, index) => <ArticleCard key={index} article={article} history={history}/>)}
            </div>
            {articles.length > 0 &&
            <Pagination count={totalPages} color="primary" onChange={(event, value) => setActivePage(value)}/>}
        </div>
    );
}

export default ArticleMainView;