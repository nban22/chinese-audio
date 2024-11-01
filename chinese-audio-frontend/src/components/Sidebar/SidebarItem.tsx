import styled from "styled-components";

const StyledSidebarItem = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    div {
        flex: 1;
        display: grid;
        grid-template-rows: 1fr 1fr;

        &>* {
            display: flex;
            align-items: center;
        }
    }
    h2 {
        font-size: 1rem;
        margin: 0;
        font-weight: 600;

    }
    p {
        font-size: 0.8rem;
        margin: 0;
        color: #b3b3b3;
    }
`;

const StyledImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 10px;
    object-fit: cover;
`

interface SidebarItemProps {
    avatar?: string;
    title?: string;
    type?: string;
    axtraInfo?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    return (
        <StyledSidebarItem>
            <StyledImage src={props.avatar} alt={props.title} />
            <div>
                <h2>{props.title}</h2>
                <p>{props.type} • {props.axtraInfo}</p>
            </div>
        </StyledSidebarItem>
    );
};

export default SidebarItem;
