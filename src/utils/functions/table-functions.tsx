import { ReactComponent as Val } from "../../assets/val.svg";
import { ReactComponent as Esp } from "../../assets/esp.svg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import { ROLE } from "../enums/role.enum";
import { Chip } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { grey } from "@mui/material/colors";
import { NO_APPLY } from "../enums/no-apply.enum";


/**
 * Returns a dynamic style object based on the given theme.
 *
 * @param {any} actualTheme - The current theme. Can be either "light" or any other value.
 * @return {object} The dynamic style object.
 */
export function getDynamicStyle(actualTheme: any){
  return {
    backgroundColor: actualTheme === "light" ? "white" : "#252525",
    color: actualTheme === "light" ? "#252525" : "white",
    "& .MuiInputBaseRoot": { border: "none" }
  }
};

/**
 * Returns a color value based on the given color name.
 *
 * @param {string} color - The name of the color.
 * @return {string} The color value.
 */
export function paletaColores(color: string) {
  switch (color) {
    case "colorTextAlter":
      return "#787878";
    case "colorBgRowSelected":
      return "rgba(255, 202, 66, 0.62)";
    case "colorBgRowSelectedBorder":
      return "#333333";
    case "colorRowHover":
      return "rgba(212, 212, 212, 0.2)";
    case "colorRowHoverDark":
      return "rgba(212, 212, 212, 1)";
  }
}
/**
 * Renders an array of strings as a series of divs. If the input is not an array or is null or undefined,
 * it renders a single div with the input string, or an empty string if the input is not a string.
 *
 * @param {string[] | undefined | null} params - The array of strings to render.
 * @return {JSX.Element} The rendered array of divs.
 */
export function arrayCell(params: string[] | undefined | null) {
  const array = params;
  if (!array || !Array.isArray(array)) {
    return typeof array === "string" ? (
      <>
        <div>{array}</div>
      </>
    ) : (
      ""
    );
  } else {
    return (
      <div>
        {array.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }
}

export const buttonStyle = {
  height: 37,
  backgroundColor: "#D9D9D9",
  color: "#404040",
  borderColor: "#404040",
  "&:hover": {
    borderColor: "#0D0D0D",
    backgroundColor: "#0D0D0D",
    color: "#f2f2f2",
  },
};

/**
 * Renders a CheckIcon or CloseIcon based on the value of the input.
 *
 * @param {boolean | undefined | string} p - The input value.
 * @return {JSX.Element} The rendered CheckIcon or CloseIcon.
 */
export function isChecked(p: boolean | undefined | string | null) {
  
  
  if (typeof p !== 'boolean') {
    return <DoNotDisturbAltRoundedIcon sx={{ color: grey[800] }}></DoNotDisturbAltRoundedIcon>;
  } else {
    let aux = p.toString();
    let aux2 = "SI";
    let aux3 = "SÍ";
    let aux4 = "x";
    return p === true ||
      aux.toLowerCase().includes(aux2.toLowerCase()) ||
      aux.toLowerCase().includes(aux3.toLowerCase()) ||
      aux.toLowerCase().includes(aux4.toLowerCase()) ? (
      <CheckIcon color="success"></CheckIcon>
    ) : (
      <CloseIcon color="error"></CloseIcon>
    );
  }
}
/**
 * Renders a CheckIcon, CloseIcon or DisabledIcon based on the value of the input.
 *
 * @param {NO_APPLY | undefined } p - The input value.
 * @return {JSX.Element} The rendered CheckIcon or CloseIcon.
 */
export function isCheckedNoApply(p: NO_APPLY | undefined | boolean) {
  if (!p) {
    return <DoNotDisturbAltRoundedIcon sx={{ color: grey[800] }}></DoNotDisturbAltRoundedIcon>;
  } else if(p !== NO_APPLY.no_apply){ {
    let aux = p.toString();
    let aux2 = "SI";
    let aux3 = "SÍ";
    let aux4 = "x";
    return p === NO_APPLY.true ||
      p === true ||
      aux.toLowerCase().includes(aux2.toLowerCase()) ||
      aux.toLowerCase().includes(aux3.toLowerCase()) ||
      aux.toLowerCase().includes(aux4.toLowerCase()) ? (
      <CheckIcon color="success"></CheckIcon>
    ) : (
      <CloseIcon color="error"></CloseIcon>
    );
    }
  } else {
    return <DoNotDisturbAltRoundedIcon sx={{ color: grey[800] }}></DoNotDisturbAltRoundedIcon>;
  }
}
/**
 * Determines the color based on the input string.
 *
 * @param {string | undefined} p - The input string to check.
 * @return {"error" | "success"} - The color based on the input.
 */
export function yesOrNo(p: string | undefined) {
  return p === "NO" || undefined ? "error" : "success";
}
/**
 * Renders a <Val /> component if the input string is 'val' or contains 'val', 
 * otherwise renders an <Esp /> component. If the input string is undefined, 
 * it also renders a <Val /> component.
 *
 * @param {string | undefined} p - The input string to check.
 * @return {JSX.Element} The rendered <Val /> or <Esp /> component.
 */
export function valOrEsp(p: string | undefined) {
  const val = "val";
  if (p) {
    return p.toLowerCase().includes(val.toLowerCase()) ? <Val /> : <Esp />;
  } else {
    return <Val />;
  }
}
/**
 * Returns a Chip component representing the role of a user.
 *
 * @param {string | undefined} role - The role of the user.
 * @return {JSX.Element} The Chip component representing the user's role.
 */
export function iconRole(role: string | undefined) {
  switch (role) {
    case ROLE.SUPER_ADMIN:
      return <Chip icon={<VerifiedUserIcon />} color="info" label="Superadministrador" />;
    case ROLE.ADMIN:
      return (
        <Chip icon={<AdminPanelSettingsIcon />} color="warning" label="Administrador" />
      );
    case ROLE.SUPER_VIEWER:
      return <Chip icon={<RemoveRedEyeIcon />} color="secondary" label="Supervisor" />;
    case ROLE.VIEWER:
      return <Chip icon={<VisibilityIcon />} color="success" label="Visor" />;
  }
}
/**
 * Returns an object containing the background color and text color for a given topic.
 *
 * @param {string | undefined} topic - The topic to get the color for.
 * @return {Object} An object with the backgroundColor and color properties.
 */
export function getTopicColor(topic: string | undefined) {
  switch (topic) {
    case "Sector Público":
      return { backgroundColor: "#9400D3", color: "white" };
    case "Salud":
      return { backgroundColor: "#4B0082", color: "white" };
    case "Cultura y ocio":
      return { backgroundColor: "#0000FF", color: "white" };
    case "Urbanismo e infraestructuras":
      return { backgroundColor: "#00FF00" };
    case "Ciencia y tecnología":
      return { backgroundColor: "#FFFF00" };
    case "Medio Ambiente":
      return { backgroundColor: "#FF7F00" };
    case "Economía":
      return { backgroundColor: "#FF0000" };
    case "Hacienda":
      return { backgroundColor: "#FF00FF" };
    case "Seguridad":
      return { backgroundColor: "#00FF80" };
    case "Turismo":
      return { backgroundColor: "#00FFFF" };
    case "Sociedad y Bienestar":
      return { backgroundColor: "#0080FF" };
    case "Educación":
      return { backgroundColor: "#000000", color: "white" };
    case "Transporte":
      return { backgroundColor: "#FFFFFF", color: "black" };
  }
}
/**
 * Generates a Google Maps URL for a given location.
 *
 * @param {string | undefined} location - The location to generate the URL for.
 * @return {string} The generated Google Maps URL, or an empty string if the location is undefined.
 */
export function getLocationUrl(location: string | undefined) {
  return !!location
    ? "https://www.google.com/maps/search/?api=1&query=" +
        location.split(" ").join("+")
    : "";
}
