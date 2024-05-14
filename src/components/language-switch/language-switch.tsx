import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ReactComponent as CasImage } from "../../assets/esp.svg";
import { ReactComponent as ValImage } from "../../assets/val.svg";
import ValImagen from "../../assets/val.svg";
import CasImagen from "../../assets/esp.svg";
import "./language-switch.css";
import { useAuthHeader, useAuthUser, useSignIn } from "react-auth-kit";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";
import { updateUserLanguage } from "../../api/users";
import { LANGUAGE } from "../../utils/enums/language.enum";

function ChangeLanguage() {
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const singIn = useSignIn();
  const [t, i18n] = useTranslation();
  const [idioma, setIdioma] = useState("es");
  const imagenes = [ValImage, CasImage];
  const [userData, setUserData] = useState<User>(userMock);

  useEffect(() => {
    if (user() && user().user) {
      setUserData(user().user);
      setIdioma(user().user.language === "caES" ? "val" : "es");
    } else {
      setIdioma("es");
      console.log("sin user");
    }
  }, [user()]);

  async function switchVisibleSeleccion() {
    console.log("hola");
    if (userData === userMock) console.log("igualesss");

    if (idioma === "es") {
      setIdioma("val");
      console.log("Idioma es: Es");
      if (userData !== null && userData !== userMock) {
        updateUserLanguage({ ...userData, language: LANGUAGE.CA }, authHeader())
          .then((response) => response.json())
          .then((data: User) => {
            const authDivided = authHeader().split(" ");
            const tokenType = authDivided[0];
            const token = authDivided[1];
            singIn({
              token,
              expiresIn: 3600,
              tokenType,
              authState: { user: data, id: data._id },
            });
          });
      }
    } else {
      setIdioma("es");
      if (userData !== userMock) {
        updateUserLanguage({ ...userData, language: LANGUAGE.ES }, authHeader())
          .then((response) => response.json())
          .then((data: User) => {
            const authDivided = authHeader().split(" ");
            const tokenType = authDivided[0];
            const token = authDivided[1];
            singIn({
              token,
              expiresIn: 3600,
              tokenType,
              authState: { user: data, id: data._id },
            });
          });
      }
    }
    await changeI18();
  }
  async function changeI18() {
    await i18n.changeLanguage(idioma);
  }
  return (
    <button
      id="buttonChangeLanguage"
      onClick={switchVisibleSeleccion}
      style={{
        height: "35px",
        width: "35px",
        padding: 0,
        backgroundImage: "transparent",
        borderRadius: 50,
        overflow: "hidden",
      }}
    >
      <img
        src={idioma === "val" ? CasImagen : ValImagen}
        alt="Image"
        style={{
          objectFit: "cover",
          objectPosition: "left",
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  );
}

export default ChangeLanguage;
