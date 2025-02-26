// hooks/useDeleteAlbum.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAlbumById } from "../../services/albumService";

export const useDeleteAlbum = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); // Thêm trạng thái thành công
  const navigate = useNavigate();

  const handleDelete = async (albumId: string, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);
    setSuccess(false); // Reset trạng thái thành công
    try {
      await deleteAlbumById(albumId);
      toast.success("Album deleted successfully");
      setSuccess(true); // Đánh dấu xóa thành công
      if (onSuccess) {
        onSuccess(); // Gọi callback nếu có
      }
      navigate("/admin/management/album"); // Chuyển hướng sau khi xóa
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting album");
      toast.error(error || "Failed to delete album");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error, success };
};