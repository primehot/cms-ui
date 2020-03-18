import React, {useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import './AricleImageUploadView.css'
import {postImage} from "../../../service/ArticleService";

function ArticleImageUploadView({onImageUpload}) {

    const imageUploadRef = useRef();
    const [image, setImage] = useState();

    const handleChange = (event) => {
        const imageBytes = event.target.files[0];
        postImage(imageBytes).then(response => {
            console.log('imageSaved', response.data);
            onImageUpload(response.data);
        });
        setImage(URL.createObjectURL(imageBytes));
    };

    return (
        <div className="image-upload-container">
            <Button variant="contained" color="primary" onClick={() => imageUploadRef.current.click()}> Upload </Button>
            <input
                type="file"
                onChange={handleChange}
                accept={"accept=image/*"}
                style={{opacity: 0, position: 'absolute', zIndex: -1}}
                ref={imageUploadRef}
            />
            <img className="image-upload-preview" src={image}/>
        </div>
    );
}

export default ArticleImageUploadView;