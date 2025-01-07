import styled from "styled-components";
import ManagementLayout from "../../../layouts/AdminLayout/ManagementLayout/ManagementLayout";
import { ppid } from "process";
import AudioActions from "../../../components/admin/ManagementLayout/Actions/AudioActions";
import { LoaderFunction, Navigate, useLoaderData } from "react-router-dom";
import { AudioAttributes, getAllAudios } from "../../../services/audioService";
import AddNewAudioModal from "../../../components/Modal/AddNewAudioModal";
import { useState } from "react";

const StyledAudioManagement = styled.div``;

const StyledTitle = styled.h1`
    font-size: 1.5rem;
    margin-block: 0;
    margin-inline: 0;
    font-weight: 600;
    text-shadow: 0 0 2px #ffffff, 0 0 2px #ff79d2;
    padding-bottom: 10px;
    padding-left: 10px;
    border-bottom: 1px solid #ffffff1f;
`;

// const audioActions = (id: string) => {
//     return (
//         <div>
//             <button>Edit</button>
//             <button>Delete</button>
//         </div>
//     )
// }

interface AudioManagementProps {}

export const audioLoader: LoaderFunction = async (props) => {
    const data = await getAllAudios();
    return { audios: data.audios, audios_total: data.audios_total };
};

const AudioManagement: React.FC<AudioManagementProps> = (props) => {
    const { audios } = useLoaderData() as { audios: AudioAttributes[] };
    const columnNames = ["Id", "Audio Name", "Audio Duration", "Audio Size", "Link"];
    const audiosData = audios.map((audio) => {
        return [audio.id, audio.fileName, audio.duration, audio.size, audio.url];
    });

    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <StyledAudioManagement>
            <ManagementLayout
                title="Audio Management"
                columnNames={columnNames}
                data={audiosData}
                Actions={AudioActions}
                onAddItem={() => setShowAddModal(true)}
            />
            <AddNewAudioModal show={showAddModal} setShow={setShowAddModal} />
        </StyledAudioManagement>
    );
};

export default AudioManagement;
