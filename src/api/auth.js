import getAxiosInstance from './'

export const login = (data) => {
    const axios = getAxiosInstance();
    return axios.post('/users', data)
}

export const register = (data) => {
    const axios = getAxiosInstance();
    return axios.post('/users', data)
}