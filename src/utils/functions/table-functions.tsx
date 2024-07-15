import { ReactComponent as Val } from "../../assets/val.svg";
import { ReactComponent as Esp } from "../../assets/esp.svg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ROLE } from "../enums/role.enum";
import { Chip } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";


export function getDynamicStyle(actualTheme: any){
  return {
    backgroundColor: actualTheme === "light" ? "white" : "#252525",
    color: actualTheme === "light" ? "#252525" : "white",
    "& .MuiInputBaseRoot": { border: "none" }
  }
};

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

export function isChecked(p: boolean | undefined | string) {
  if (!p) {
    return <CloseIcon color="error"></CloseIcon>;
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
export function yesOrNo(p: string | undefined) {
  return p === "NO" || undefined ? "error" : "success";
}
export function valOrEsp(p: string | undefined) {
  const val = "val";
  if (p) {
    return p.toLowerCase().includes(val.toLowerCase()) ? <Val /> : <Esp />;
  } else {
    return <Val />;
  }
}
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
export function getLocationUrl(location: string | undefined) {
  return !!location
    ? "https://www.google.com/maps/search/?api=1&query=" +
        location.split(" ").join("+")
    : "";
}
