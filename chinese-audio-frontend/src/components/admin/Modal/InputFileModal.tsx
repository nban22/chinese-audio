import { useEffect, useState } from "react";

interface InputFileModalProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputFileModal: React.FC<InputFileModalProps> = ({ label, ...props }) => {
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [selectedAudioURL, setSelectedAudioURL] = useState<string | null>(null);

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null; // Nếu không có file, đặt thành null
    if (file) {
      // Giải phóng URL cũ nếu có
      if (selectedAudioURL) {
        URL.revokeObjectURL(selectedAudioURL);
      }
      // Tạo URL mới
      const newAudioURL = URL.createObjectURL(file);
      setSelectedAudioURL(newAudioURL);
      setSelectedAudio(file);
    } else {
      // Xử lý khi không có file được chọn (hủy chọn)
      if (selectedAudioURL) {
        URL.revokeObjectURL(selectedAudioURL);
        setSelectedAudioURL(null);
      }
      setSelectedAudio(null);
    }
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (selectedAudioURL) {
        URL.revokeObjectURL(selectedAudioURL);
      }
    };
  }, [selectedAudioURL]); // Thêm selectedAudioURL vào dependency array

  return (
    <>
      <label htmlFor={props.id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        {...props}
        type="file"
        className="hidden"
        onChange={handleAudioChange}
        accept="audio/*" // Giới hạn chỉ chọn file audio
      />

      <div className="flex">
        <label
          htmlFor={props.id}
          className="mt-1 block min-w-0 flex-[0_1_200px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Choose Audio File
        </label>
      </div>

      {selectedAudio && selectedAudioURL && (
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Selected File: <strong>{selectedAudio.name}</strong>
          </p>
          <audio controls className="mt-2 w-full" src={selectedAudioURL}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  );
};

export default InputFileModal;