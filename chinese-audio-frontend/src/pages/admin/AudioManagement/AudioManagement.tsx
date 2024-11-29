import styled from 'styled-components';
import ManagementLayout from '../../../layouts/AdminLayout/ManagementLayout/ManagementLayout';
import { ppid } from 'process';
import AudioActions from '../../../components/admin/ManagementLayout/Actions/AudioActions';

const StyledAudioManagement = styled.div`
    
`;

const StyledTitle = styled.h1`
    font-size: 1.5rem;
    margin-block: 0;
    margin-inline: 0;
    font-weight: 600;
    text-shadow: 0 0 2px #ffffff, 0 0 2px #ff79d2;
    padding-bottom: 10px;
    padding-left: 10px; 
    border-bottom: 1px solid #ffffff1f;
`

// const audioActions = (id: string) => {
//     return (
//         <div>
//             <button>Edit</button>
//             <button>Delete</button>
//         </div>
//     )
// }

interface AudioManagementProps {

}

const AudioManagement: React.FC<AudioManagementProps> = (props) => {
    const columnNames = ["Audio Name", "Audio File", "Audio Duration", "Audio Size"];
    const data = [
        ["Audio 1", "audio1.mp3", "5:00", "5MB"],
        ["Audio 2", "audio2.mp3", "3:00", "3MB"],
        ["Audio 3", "audio3.mp3", "7:00", "7MB"],
        ["Audio 4", "audio4.mp3", "2:00", "2MB"],
        ["Audio 5", "audio5.mp3", "1:00", "1MB"],
    ]

    return (
        <StyledAudioManagement>
            <ManagementLayout 
                title="Audio Management" 
                columnNames={columnNames}
                data={data}
                Actions={AudioActions}
            />
        </StyledAudioManagement>
    );
};

export default AudioManagement;