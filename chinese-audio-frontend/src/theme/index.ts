import ThemeProps from "./theme";

const dark: ThemeProps = {
    sidebar: {
        backgroundColor: "black",
        color: "white",
    },
};
const light: ThemeProps = {
    sidebar: {
        backgroundColor: "white",
        color: "black",
    },
};

const theme = {
    dark,
    light,
};

export default theme;
