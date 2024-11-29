import styled from "styled-components";
import IconHome from "../../icons/IconHome";
import IconBrowse from "../../icons/IconBrowse";
import IconSearch from "../../icons/IconSearch";
import IconTimes from "../../icons/IconTimes";
import { useNavigate } from "react-router-dom";

const StyledHeaderControls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 450px;
    min-width: 200px;
    margin-inline: 10px;

    flex: 1 1 auto;



    .homeButton {
        height: 100%;
        aspect-ratio: 1;
        background-color: #6a6a6a51;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        & > * {
            color: white;
        }
    }
`;

const FormContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    
    position: relative;
    border-radius: 100px;
    overflow: hidden;
    background-color: #6a6a6a51;
    transition: all 0.2s ease;
    box-shadow: 0 0 0 2px transparent inset;

    .searchButton {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: absolute;
    }

    .browseButton,
    .clear-search {
        position: absolute;
        height: 100%;
        border: none;
        background-color: transparent;
        cursor: pointer;
        border-radius: 50%;

        & > * {
            transition: all 0.2s ease;
            color: #c7c7c7a3;
        }
    }
    .searchButton {
        left: 0;
        aspect-ratio: 1;
    }
    input {
        height: 100%;
        border: none;
        background-color: transparent;
        flex: 1;
        padding-left: 48px;
        padding-right: 60px;
        outline: none;
        line-height: 1.2rem;
        color: var(--white-color, #fff);
        letter-spacing: 0.6px;
        font-size: 1.2rem;
    }
    .browseButton {
        right: 0;
        aspect-ratio: 1;
    }
    .clear-search {
        display: none;
        right: 0;
        aspect-ratio: 1;
        transition: all 0.2s ease;
        &:hover,
        &:active {
            transform: scale(1.3);
        }
    }
    input:not(:placeholder-shown) ~ .clear-search {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input:not(:placeholder-shown) ~ .browseButton {
        display: none;
    }

    &:hover {
        transition: all 0.2s ease;
        box-shadow: 0 0 0 2px #6a6a6a67 inset;
        background-color: #6a6a6a67;
        .searchButton {
            & > * {
                color: var(--white-color, #fff);
            }
        }
    }
    &:has(input:focus) {
        transition: all 0.2s ease;
        box-shadow: 0 0 0 2px var(--white-color, #fff) inset;
        background-color: #6a6a6a67;
        .searchButton {
            & > * {
                color: var(--white-color, #fff);
            }
        }
    }
`;

interface HeaderControlsProps {}

const HeaderControls: React.FC<HeaderControlsProps> = (props) => {
    const navigate = useNavigate();
    return (
        <StyledHeaderControls>
            <button className="homeButton" onClick={() => navigate("/")}>
                <IconHome size={24} />
            </button>
            <FormContainer>
                <div className="searchButton">
                    <IconSearch size={24} />
                </div>
                <input type="text" placeholder="What do you want to play?" />
                <button className="browseButton">
                    <IconBrowse size={24} />
                </button>
                <button className="clear-search">
                    <IconTimes size={34} />
                </button>
            </FormContainer>
        </StyledHeaderControls>
    );
};

export default HeaderControls;
