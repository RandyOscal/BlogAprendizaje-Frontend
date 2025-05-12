import axios from "axios";

const apiClient = axios.create({
baseURL: "http://127.0.0.1:3000/blogAprendizaje/v1",
timeout: 5000,
httpsAgent: false,


});

export const getAllPublicates = async () => {
    try {
    const res = await apiClient.get("/publications");
    return { data: res.data }
    } catch (e) {
    return {
        error: true,
        e,
    };
    }
};

export const getPublicationDetails  = async (id) => {
    try {
    return await apiClient.get(`/publications/list/${id}`);
    } catch (e) {
    return {
        error: true,
        e,
    };
    }
};

export const getByCategoryPublicates = async (categoryName) => {
    try {
    return await apiClient.get(`/publications/category/${categoryName}`);
    } catch (e) {
    return {
        error: true,
        e,
    };
    }
};

export const createComment = async (data) => {
    try {
        const res = await apiClient.post(`/comments/addComment`, data);
        return {data: res.data}
    } catch (e) {        
        return {
            error: true,
            e,
        };
    }
}


