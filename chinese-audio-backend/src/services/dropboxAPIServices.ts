import { Response } from "express";
import AppError from "../utils/appError";

export const getAccessToken = async () => {
    const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
    const clientId = process.env.DROPBOX_APP_KEY;
    const clientSecret = process.env.DROPBOX_APP_SECRET;

    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    const data = await response.json();

    if (!data.access_token) {
        throw new AppError("Error getting access token from Dropbox", 500);
    }

    return data.access_token;
};

export const fetchUploadAudio = async (asscessToken: string, buffer: Buffer) => {
    const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${asscessToken}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
                path: `/audio/${Date.now()}.mp3`,
                mode: "add",
                autorename: true,
            }),
        },
        body: buffer,
    });

    return response as any;
};

export const uploadAudioToDropbox = async (buffer: Buffer) => {
    let accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    if (!accessToken) {
        accessToken = await getAccessToken();
    }
    let uploadResponse = await fetchUploadAudio(accessToken!, buffer);
    if (uploadResponse.status === 401) {
        console.log("Access token expired, refreshing token...");
        accessToken = await getAccessToken();
        uploadResponse = await fetchUploadAudio(accessToken!, buffer);
    }
    if (uploadResponse.status !== 200) {
        throw new AppError("Error uploading audio to Dropbox", 500);
    }
    return await uploadResponse.json();
};
