import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {API_BASE_URL} from "../../service/http/HttpClient";
import {DEFAULT_IMAGE_URL} from "../../constants";

import './ArticleCard.css';

const CARD_DESCRIPTION_LIMIT = 30;

function ArticleCard({article, history}) {

    const onCardClick = () => {
        history.push(`/article/${article.id}`);
    };

    return (
        <div className="card-container">
            <Card style={{width: '300px'}}>
                <CardActionArea onClick={onCardClick}>
                    <CardMedia
                        style={{height: '150px'}}
                        image={article.imageId ? API_BASE_URL + '/image/' + article.imageId : DEFAULT_IMAGE_URL}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {article.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            {article.description.substring(0, article.description.length > CARD_DESCRIPTION_LIMIT ? CARD_DESCRIPTION_LIMIT : article.description.length)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Is published: {article.isPublished === true ? "Yes" : "No"}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default ArticleCard;