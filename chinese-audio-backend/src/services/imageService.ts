import Image from "../models/image";
import { dropboxService } from "./dropboxServices";

// Hàm cơ bản để tải ảnh lên Dropbox và trả về dữ liệu
const uploadImageToDropbox = async (file: Express.Multer.File): Promise<{ url: string; dropboxPath: string }> => {
    const { url, path_lower } = await dropboxService.uploadImage(file.buffer, file.originalname);
    return { url, dropboxPath: path_lower };
};

// Hàm tạo mới ảnh cho một owner (dùng khi create)
export const createImageData = async (
    ownerType: string, // "Album" hoặc "Artist"
    ownerId: number,
    file?: Express.Multer.File
): Promise<void> => {
    if (!file) return;

    const { url, dropboxPath } = await uploadImageToDropbox(file);
    await Image.create({
        url,
        dropboxPath,
        fileName: file.originalname,
        ownerType,
        ownerId,
    });
};

// Hàm cập nhật ảnh (dùng khi update)
export const updateImageData = async (
    ownerType: string, // "Album" hoặc "Artist"
    ownerId: number,
    file?: Express.Multer.File
): Promise<void> => {
    if (!file) return;

    const existingImage = await Image.findOne({ where: { ownerType, ownerId } });
    if (existingImage?.dropboxPath) await dropboxService.deleteFile(existingImage.dropboxPath);

    const { url, dropboxPath } = await uploadImageToDropbox(file);
    await existingImage?.update({
        url,
        dropboxPath,
        fileName: file.originalname,
    });

    if (!existingImage) {
        await Image.create({
            url,
            dropboxPath,
            fileName: file.originalname,
            ownerType,
            ownerId,
        });
    }

};

// Hàm xóa ảnh cho một owner
export const deleteImageData = async (
    ownerType: string, // "Album" hoặc "Artist"
    ownerId: number
): Promise<void> => {
    const image = await Image.findOne({ where: { ownerType, ownerId } });
    if (!image) return;

    if (image.dropboxPath) {
        await dropboxService.deleteFile(image.dropboxPath);
    }

    await image.destroy();
};
