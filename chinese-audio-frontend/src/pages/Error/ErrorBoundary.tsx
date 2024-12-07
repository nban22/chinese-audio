import { useRouteError } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const StyledErrorBoundary = styled.div``;

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
    const error = useRouteError() as any;
    if (error) {
        toast.error(error.message || "An error occurred");
    }
    return <>{props.children}</>;
};

export default ErrorBoundary;
