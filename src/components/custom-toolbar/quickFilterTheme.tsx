import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { esES } from '@mui/x-data-grid';
/**
 * Creates a theme with custom typography, font family, and color palette for when the user is not hovering the component.
 *
 * @param {any} actualTheme - The actual theme object.
 * @return {object} The created theme object.
 */

const quickFilterTheme = (actualTheme:any) => createTheme({
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
          main: "#404040",
          light: "#404040",
          dark: "#404040",
          contrastText: "#404040",
      },
      divider: "#404040",
      background: {
          default: "#D9D9D9",
          paper: "#D9D9D9",
      },
      text: {
          primary: "#404040",
          secondary: "#404040",
      },
  }
});

export default quickFilterTheme;