import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import './AricleImageUploadView.css'
import {postImage} from "../../../service/ArticleService";
import {DEFAULT_IMAGE_URL} from "../../../constants";
import {API_BASE_URL} from "../../../service/http/HttpClient";

function ArticleImageUploadView({imageId, onImageUpload}) {

    const imageUploadRef = useRef();
    const [image, setImage] = useState(DEFAULT_IMAGE_URL);

    useEffect(() => {
        if(imageId) {
            setImage(API_BASE_URL + '/image/' + imageId);
        }
    },[imageId]);

    const handleChange = (event) => {
        const imageBytes = event.target.files[0];
        postImage(imageBytes).then(response => {
            onImageUpload(response.data);
        }).catch(error => {
            console.log('Saved image failed', error)
        });
    };

    return (
        <div className="image-upload-container">
            <Button variant="contained" color="primary" onClick={() => imageUploadRef.current.click()}> Upload
                Image</Button>
            <input
                type="file"
                onChange={handleChange}
                accept={"accept=image/*"}
                style={{opacity: 0, position: 'absolute', zIndex: -1}}
                ref={imageUploadRef}
            />
            <img alt="Article" className="image-preview" src={image}/>
        </div>
    );
}

export default ArticleImageUploadView;