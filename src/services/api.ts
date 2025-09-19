import axios from "./axios.customize";


// getAllProductAPI
export const getUsersAPI = () => {
    const URL_BACKEND = `users`;
    return axios.get(URL_BACKEND);
};

export const getPageBySlug = (slug: string) => {
    return axios.get(`/api/pages/slug/${encodeURIComponent(slug)}`);
};