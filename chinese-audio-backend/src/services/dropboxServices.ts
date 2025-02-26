import AppError from "../utils/appError";

class DropboxService {
    /** Thuộc tính private để lưu trữ access token */
    private accessToken: string | null = null;

    /** Constructor khởi tạo access token từ biến môi trường nếu có */
    constructor() {
        this.accessToken = process.env.DROPBOX_ACCESS_TOKEN || null;
    }

    /** Phương thức private để làm mới access token */
    private async refreshAccessToken(): Promise<void> {
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
        this.accessToken = data.access_token;
        if (this.accessToken) {
            process.env.DROPBOX_ACCESS_TOKEN = this.accessToken; // Cập nhật biến môi trường (tùy chọn)
        }
    }

    /** Phương thức private để thực hiện yêu cầu tải lên file audio */
    private async uploadAudioFetch(token: string, buffer: Buffer, originalFileName: string): Promise<Response> {
        return fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/octet-stream",
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/audio/${Date.now()}-${originalFileName}`,
                    mode: "add",
                    autorename: true,
                }),
            },
            body: buffer,
        });
    }

    /** Phương thức private để thực hiện yêu cầu tải lên file ảnh */
    private async uploadImageFetch(token: string, buffer: Buffer, originalFileName: string): Promise<Response> {
        return fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/octet-stream",
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/image/${Date.now()}-${originalFileName}`,
                    mode: "add",
                    autorename: true,
                }),
            },
            body: buffer,
        });
    }

    /** Phương thức private để thực hiện yêu cầu xóa file bất kỳ */
    private async deleteFileFetch(token: string, path: string): Promise<Response> {
        return fetch("https://api.dropboxapi.com/2/files/delete_v2", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                path: path,
            }),
        });
    }

    /** Phương thức private để thực hiện yêu cầu tạo link chia sẻ */
    private async createSharedLinkFetch(token: string, path: string): Promise<Response> {
        return fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
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
    }

    /** Phương thức private để thực thi các yêu cầu fetch với quản lý token */
    private async executeFetch<T>(
        fetchFn: (token: string) => Promise<Response>,
        processResponse: (response: Response) => Promise<T>
    ): Promise<T> {
        if (!this.accessToken) {
            await this.refreshAccessToken();
        }
        let response = await fetchFn(this.accessToken!);
        if (response.status === 401) {
            console.log("Access token expired, refreshing token...");
            await this.refreshAccessToken();
            response = await fetchFn(this.accessToken!);
        }
        if (!response.ok) {
            const errorData = await response.json();
            throw new AppError("Dropbox API error " + errorData.error_summary, response.status);
        }
        return await processResponse(response);
    }

    /** Phương thức public để tải lên file audio và tạo link chia sẻ */
    public async uploadAudio(buffer: Buffer, originalFileName: string): Promise<any> {
        const uploadData = await this.executeFetch(
            (token) => this.uploadAudioFetch(token, buffer, originalFileName),
            (response) => response.json()
        );
        const sharedLink = await this.createSharedLink(uploadData.path_display);
        return { ...uploadData, url: sharedLink };
    }

    /** Phương thức public để tải lên file ảnh và tạo link chia sẻ */
    public async uploadImage(buffer: Buffer, originalFileName: string): Promise<any> {
        const uploadData = await this.executeFetch(
            (token) => this.uploadImageFetch(token, buffer, originalFileName),
            (response) => response.json()
        );
        const sharedLink = await this.createSharedLink(uploadData.path_display);

        return { ...uploadData, url: sharedLink };
    }

    /** Phương thức public để xóa file bất kỳ */
    public async deleteFile(path: string): Promise<any> {
        return this.executeFetch(
            (token) => this.deleteFileFetch(token, path),
            (response) => response.json()
        );
    }

    /** Phương thức public để tạo link chia sẻ */
    public async createSharedLink(path: string): Promise<string> {
        return this.executeFetch(
            (token) => this.createSharedLinkFetch(token, path),
            async (response) => {
                const data = await response.json();
                if (!data.url) {
                    throw new AppError("Error creating shared link", 500);
                }
                return data.url.replace("dl=0", "raw=1");
            }
        );
    }
}

/** Xuất instance duy nhất của class để sử dụng trong ứng dụng */
export const dropboxService = new DropboxService();
