import { createStackNavigator } from "@react-navigation/stack";
import { Modal } from "react-native";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { RootStackParamList } from "../types/navigation/rootStackParamList";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#000" }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ presentation: "modal" }}>
      <RootStack.Screen
        name="MainScreen"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CreateReviewScreen"
        component={CreateReviewScreen}
      />
    </RootStack.Navigator>
  );
};
