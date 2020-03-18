import http from "./http/HttpClient";

export const postArticle = (article) => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    };
    return http.post('/article', article);
};

export const postImage = (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return http.post('/image/upload', formData, config);
};
