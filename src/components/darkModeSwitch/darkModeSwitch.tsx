import React, { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser, useSignIn } from "react-auth-kit";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";
import { updateUserThemeApp } from "../../api/users";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";
import useAlternateTheme from "./alternateTheme";


const DarkModeSwitch = () => {//: React.FC<{ onThemeChange: (themeStatus: string) => void }> = ({ onThemeChange }) => {
    const user = useAuthUser();
    const authHeader = useAuthHeader();
    const singIn = useSignIn();
    const {actualTheme} = useAlternateTheme();
    const {toggleTheme} = useAlternateTheme();
    const [userData, setUserData] = useState<User>(userMock);

    useEffect(() => {
        if (user() && user().user) {
          setUserData(user().user);
        } else {
          console.log("sin user");
        }
      }, [user()]);

    async function switchThemeApp() {
        if(actualTheme==="light"){
            toggleTheme();
            if(userData !== null && userData !== userMock){
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
        } else if(actualTheme==="dark"){
            toggleTheme();
            if(userData !== null && userData !== userMock){
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
        <button onClick={switchThemeApp}>Theme</button>
    );
};

export default DarkModeSwitch;