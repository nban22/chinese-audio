import styled from 'styled-components';
import Example from '../../../components/Example';

const StyledDashboard = styled.div`
    
`;

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = (props) => {
    return (
        <StyledDashboard>
            <h1>Dashboard</h1>
            <Example />
        </StyledDashboard>
    );
};

export default Dashboard;