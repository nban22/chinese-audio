import ManagementLayout from "../../../layouts/AdminLayout/ManagementLayout/ManagementLayout";
import AudioActions from "../../../components/admin/ManagementLayout/Actions/AudioActions";
import { AudioAttributes, getAllAudios } from "../../../services/audioService";
import ModalAddNewAudio from "../../../components/Modal/ModalAddNewAudio";
import { useEffect, useState } from "react";

interface AudioManagementProps {}

const AudioManagement: React.FC<AudioManagementProps> = (props) => {
  const audioKeys = {
    id: "Id",
    title: "Title",
    description: "Description",
    originalFileName: "Audio Name",
    duration: "Audio Duration",
    size: "Audio Size",
    url: "Link",
  };

  const [audiosData, setAudiosData] = useState<AudioAttributes[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const fetchAudios = async () => {
    try {
      const data = await getAllAudios();
      setAudiosData(data.audios);
    } catch (error) {
      console.error("Error in audioLoader", error);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, [isDataChanged]);

  return (
    <main className="">
      <ManagementLayout
        title="Audio Management"
        columnNames={audioKeys}
        data={audiosData || []}
        Actions={(props) => <AudioActions {...props} onSuccess={fetchAudios} />}
        onAddItem={() => setShowAddModal(true)}
      />
      {showAddModal && (
        <ModalAddNewAudio
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchAudios}
        />
      )}
    </main>
  );
};

export default AudioManagement;
