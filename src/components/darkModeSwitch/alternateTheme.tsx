import { useState, useEffect } from 'react';
import { useAuthHeader, useAuthUser, useSignIn } from "react-auth-kit";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";
import { THEMEAPP } from '../../utils/enums/themeApp.enum';

/**
 * Custom hook to manage the theme of the application.
 *
 * @return {Object} An object containing the current theme and a function to toggle the theme.
 */
const useAlternateTheme = () => {
  const user = useAuthUser();
  const [userData, setUserData] = useState<User>(userMock);
  const [actualTheme, setActualTheme] = useState<any>(); // Initialize with default theme

  useEffect(() => {
    if (user() && user().user) {
      setUserData(user().user);
      setActualTheme(user().user.themeApp);
    } else {
      setActualTheme(THEMEAPP.light);
    }
  }, [user()]);

  /**
   * Toggles the theme between 'light' and 'dark'.
   *
   * @return {void} This function does not return anything.
   */
  const toggleTheme = () => {
    setActualTheme(actualTheme === THEMEAPP.light ? THEMEAPP.dark : THEMEAPP.light);
  };

  return { actualTheme, toggleTheme };
};

export default useAlternateTheme;