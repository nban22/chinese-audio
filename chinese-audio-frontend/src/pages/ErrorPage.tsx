import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledErrorPage = styled.div`
    padding-inline: 20px;
    background-color: #111;
    color: #fff;
    overflow-y: auto;
    height: 100vh;
    h1 {
        color: #fff;
        font-size: 3rem;
        margin: 0;
        padding: 2rem;
    }
    p {
        display: flex;
        align-items: flex-start;
    }

`;
const StyledKey = styled.span`
    color: yellow;
   
    font-weight: 600;
`;
const StyledValue = styled.span``;

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
    const formatPrettierObject = (err: object) => Object.entries(err).map((obj, i) => (
        <p key={i}>
            <StyledKey>{obj[0]}</StyledKey>: <StyledValue>{typeof obj[1] === 'object' ? formatPrettierObject(obj[1]) : JSON.stringify(obj[1])}</StyledValue>
        </p>
    ))
    const err = useRouteError() as object;
    return (
        <StyledErrorPage>
            <h1>Error:</h1>
            {err
                ? formatPrettierObject(err)
                : ""}
        </StyledErrorPage>
    );
};

export default ErrorPage;
