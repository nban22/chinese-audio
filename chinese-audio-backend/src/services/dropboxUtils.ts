import { Response } from "express";
import AppError from "../utils/appError";
import { access } from "fs";

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

export const fetchUploadAudio = async (asscessToken: string, buffer: Buffer, originalFileName: string) => {
    return await fetch("https://content.dropboxapi.com/2/files/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${asscessToken}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
                path: `/audio/${Date.now()}-${originalFileName}`,
                mode: "add",
                autorename: true,
            }),
        },
        body: buffer,
    });
};

export const fetchDeleteAudio = async (accessToken: string, path: string) => {
    return await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            path: path,
        }),
    });
};

export const createSharedLink = async (accessToken: string, path: string) => {
    const response = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            path: path,
            settings: {
                access: "viewer",
                allow_download: true,
                audience: "public",
                requested_visibility: "public",
            },
        }),
    });
    const data = await response.json();

    if (!data.url) {
        throw new AppError("Error creating shared link", 500);
    }

    const downloadableLink = data.url.replace("dl=0", "dl=1");

    return downloadableLink;
};
