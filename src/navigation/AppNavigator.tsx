import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { AuthScreen } from "../screens/AuthScreen";
import { MainTabNavigator } from "./MainTabNavigation";

export const AppNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
