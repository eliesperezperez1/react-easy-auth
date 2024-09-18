import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { esES } from '@mui/x-data-grid';
import { THEMEAPP } from "../../utils/enums/themeApp.enum";

/**
 * Creates a base theme for the application based on the provided actualTheme, and change
 * the color palette based on the actualTheme.
 *
 * @param {any} actualTheme - The actual theme object.
 * @return {object} The created base theme object.
 */
const baseTheme = (actualTheme:any) => createTheme(
    {
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
      palette:{
        mode: actualTheme===THEMEAPP.light ? THEMEAPP.light : THEMEAPP.dark,
        ...(actualTheme === THEMEAPP.light
        ? {
            // palette values for light mode
            primary: grey,
            divider: grey[800],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: grey,
            divider: grey[900],
            background: {
              default: grey[900],
              paper: grey[900],
            },
            text: {
              primary: grey[100],
              secondary: grey[200],
            },
          }),
      },
    },
    esES
  );

  export default baseTheme;