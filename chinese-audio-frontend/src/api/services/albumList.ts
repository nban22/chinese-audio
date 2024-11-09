
export const getAlbumLists = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/album-lists`);
    const albumLists = await response.json();
    return albumLists;
}

export const getAlbumList = async (id: string) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/album-lists/${id}`);
    const data = await response.json();
    if (data.status === 'success') {
        return data.data.albumList;
    }
    return null;
}