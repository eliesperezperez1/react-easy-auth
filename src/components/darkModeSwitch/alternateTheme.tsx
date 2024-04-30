import { useState, useEffect } from 'react';
import { useAuthHeader, useAuthUser, useSignIn } from "react-auth-kit";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";

const useAlternateTheme = () => {
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const [userData, setUserData] = useState<User>(userMock);
  const [actualTheme, setActualTheme] = useState<any>(); // Initialize with default theme

  useEffect(() => {
    if (user() && user().user) {
      setUserData(user().user);
      setActualTheme(user().user.themeApp);
      console.log("user().user.themeApp: " + user().user.themeApp);
    } else {
      setActualTheme("light");
    }
  }, [user()]);

  const toggleTheme = () => {
    setActualTheme(actualTheme === 'light' ? 'dark' : 'light');
  };

  return { actualTheme, toggleTheme };
};

export default useAlternateTheme;