import http from "./http/HttpClient";

export const postArticle = (article) => {
    return http.post('/article', article);
};

export const putArticle = (id, article) => {
    console.log(article)
    return http.put(`/article/${id}`, article);
};

export const getArticle = (id) => {
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
