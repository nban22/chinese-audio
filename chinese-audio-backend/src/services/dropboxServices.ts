import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../utils/appError";
import { getAccessToken, fetchUploadAudio, createSharedLink, fetchDeleteAudio } from "./dropboxUtils";

export const uploadAudioToDropbox = async (buffer: Buffer, originalFileName: string) => {
    let accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    if (!accessToken) {
        accessToken = await getAccessToken();
    }
    let uploadResponse = await fetchUploadAudio(accessToken!, buffer, originalFileName);
    if (uploadResponse.status === 401) {
        console.log("Access token expired, refreshing token...");
        accessToken = await getAccessToken();
        process.env.DROPBOX_ACCESS_TOKEN = accessToken;
        uploadResponse = await fetchUploadAudio(accessToken!, buffer, originalFileName);
    }
    if (uploadResponse.status !== 200) {
        throw new AppError("Error uploading audio to Dropbox", 500);
    }
    const uploadData = await uploadResponse.json();

    uploadData.url = await createSharedLink(accessToken!, uploadData.path_display);

    return uploadData;
};

export const deleteAudioFromDropbox = async (path: string) => {
    let accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    if (!accessToken) {
        accessToken = await getAccessToken();
    }
    let deleteResponse = await fetchDeleteAudio(accessToken!, path);
    if (deleteResponse.status === 401) {
        console.log("Access token expired, refreshing token...");
        accessToken = await getAccessToken();
        process.env.DROPBOX_ACCESS_TOKEN = accessToken;
        deleteResponse = await fetchDeleteAudio(accessToken!, path);
    }
    if (deleteResponse.status !== 200) {
        throw new AppError(ERROR_CODES.DROPBOX.DROPBOX_DELETE_ERROR);
    }
    const data = await deleteResponse.json();

    return data;
};
