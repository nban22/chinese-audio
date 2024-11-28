import styled from 'styled-components';

const StyledSettings = styled.div`
    
`;

interface SettingsProps {

}

const Settings: React.FC<SettingsProps> = (props) => {
    return (
        <StyledSettings>
            <h1>Settings</h1>
        </StyledSettings>
    );
};

export default Settings;