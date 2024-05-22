import { ReactComponent as Val } from "../../assets/val.svg";
import { ReactComponent as Esp } from "../../assets/esp.svg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
export function isChecked(p: boolean | undefined | string) {
  return p === true || p === "SI" ? (
    <CheckIcon color="success"></CheckIcon>
  ) : (
    <CloseIcon color="error"></CloseIcon>
  );
}
export function yesOrNo(p: string | undefined) {
  return p === "NO" || undefined ? "error" : "success";
}
export function valOrEsp(p: string | undefined) {
  return p === "VAL" || undefined ? <Val /> : <Esp />;
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
