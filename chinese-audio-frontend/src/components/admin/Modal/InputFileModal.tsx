import { useEffect, useState } from "react";

interface InputFileModalProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputFileModal: React.FC<InputFileModalProps> = ({ label, ...props }) => {
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [selectedAudioURL, setSelectedAudioURL] = useState<string | null>(null);

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Giải phóng URL cũ nếu có
      if (selectedAudioURL) {
        URL.revokeObjectURL(selectedAudioURL);
      }
      // Tạo URL mới
      const newAudioURL = URL.createObjectURL(file);
      setSelectedAudioURL(newAudioURL);
      setSelectedAudio(file);
    }
  };
  useEffect(() => {
    return () => {
      // Giải phóng URL khi component bị hủy
      if (selectedAudioURL) {
        URL.revokeObjectURL(selectedAudioURL);
        setSelectedAudioURL(null);
      }
      setSelectedAudio(null);
    };
  }, []);

  return (
    <>
      <label htmlFor={props.id} className="block text-sm font-medium">
        {label}
      </label>
      <input {...props} className="hidden" />

      <div className="flex">
        <label
          htmlFor="audio"
          className="mt-1 block min-w-0 flex-[0_1_200px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Choose File
        </label>
      </div>

      {selectedAudio && (
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Selected File: <strong>{selectedAudio.name}</strong>
          </p>
          <audio controls className="mt-2 w-full" src={selectedAudioURL || ""}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  );
};

export default InputFileModal;
