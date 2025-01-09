

export const setTokenItem = (value: string) => {
    localStorage.setItem('token', value);
}

export const getTokenItem = () => {
    return localStorage.getItem('token');
}

export const removeTokenItem = () => {
    localStorage.removeItem('token');
}