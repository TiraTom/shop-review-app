import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { ShopDetail } from "../components/ShopDetail";
import { RootStackParamList } from "../types/navigation/rootStackParamList";
import { StyleSheet, SafeAreaView } from "react-native";
import { FloatingActionButton } from "../components/FloatingActionButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "ShopScreen">;
  route: RouteProp<RootStackParamList, "ShopScreen">;
};

export const ShopScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { shop } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: shop.name });
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop} />
      <FloatingActionButton
        iconName="plus"
        onPress={() => {
          navigation.navigate("CreateReviewScreen", { shop });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
