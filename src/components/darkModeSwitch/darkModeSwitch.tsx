import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser, useSignIn } from "react-auth-kit";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";
import { updateUserThemeApp } from "../../api/users";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";
import useAlternateTheme from "./alternateTheme";
import Luna from "../../assets/moon.svg";
import Sol from "../../assets/sun.svg";
import "./darkModeSwitch.css";

const DarkModeSwitch = () => {
  //: React.FC<{ onThemeChange: (themeStatus: string) => void }> = ({ onThemeChange }) => {
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const singIn = useSignIn();
  const { actualTheme } = useAlternateTheme();
  const { toggleTheme } = useAlternateTheme();
  const [userData, setUserData] = useState<User>(userMock);

  useEffect(() => {
    if (user() && user().user) {
      setUserData(user().user);
    }
  }, [user()]);

  async function switchThemeApp() {
    if (actualTheme === "light") {
      toggleTheme();
      if (userData !== null && userData !== userMock) {
        updateUserThemeApp({ ...userData, themeApp: THEMEAPP.DA }, authHeader())
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
    } else if (actualTheme === "dark") {
      toggleTheme();
      if (userData !== null && userData !== userMock) {
        updateUserThemeApp({ ...userData, themeApp: THEMEAPP.LI }, authHeader())
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
  }

  return (
    <button
      className="darkModeButton"
      onClick={switchThemeApp}
      style={{
        height: "35px",
        width: "35px",
        padding: 0,
        backgroundImage: "transparent",
        borderRadius: 45,
        overflow: "hidden",
        borderColor: actualTheme === "light" ? "#252525" : "white",
        borderWidth: 2,
      }}
    >
      <img
        src={actualTheme === "light" ? Sol : Luna}
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
};

export default DarkModeSwitch;
