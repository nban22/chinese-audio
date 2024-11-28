import styled from 'styled-components';

const StyledDashboard = styled.div`
    
`;

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = (props) => {
    return (
        <StyledDashboard>
            <h1>Dashboard</h1>
        </StyledDashboard>
    );
};

export default Dashboard;