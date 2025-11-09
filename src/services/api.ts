import axios from "./axios.customize";


// getAllProductAPI
export const getUsersAPI = () => {
    const URL_BACKEND = `users`;
    return axios.get(URL_BACKEND);
};

export const getPageBySlug = (slug: string) => {
    return axios.get(`/api/pages/slug/${encodeURIComponent(slug)}`);
};

export interface GetEventsParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    status?: 'all' | 'published' | 'draft';
    featured?: boolean;
}

export const getEvents = (params?: GetEventsParams) => {
    return axios.get(`/api/events`, {
        params
    });
};