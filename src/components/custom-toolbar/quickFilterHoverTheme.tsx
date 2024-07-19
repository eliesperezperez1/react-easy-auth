import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { esES } from '@mui/x-data-grid';

/*
 * Creates a theme with a custom font family, font face, and color palette for when the user is hovering the component.
 *
 * @param {any} actualTheme - The actual theme object.
 * @return {object} The created theme object.
 */
const quickFilterHoverTheme = (actualTheme:any) => createTheme({
    typography: {
        fontFamily: "Montserrat",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
            font-family: 'Montserrat';
            src: url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);
            }
        `,
        },
    },
    palette: {
        primary: {
            main: "#f2f2f2",
            light: "#f2f2f2",
            dark: "#f2f2f2",
            contrastText: "#f2f2f2",
        },
        divider: "#f2f2f2",
        background: {
            default: "#0D0D0D",
            paper: "#0D0D0D",
        },
        text: {
            primary: "#f2f2f2",
            secondary: "#f2f2f2",
        },
    }
});

export default quickFilterHoverTheme;