import http from "./http/HttpClient";

export const postArticle = (article) => {
    return http.post('/article', article);
};

export const getArticle = (id) => {
    console.log(id)
    return http.get(`/article/${id}`);
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
