import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { Shop } from "../types/firestore/shop";
import { getShops } from "../lib/firebase";
import { ShopReviewItem } from "../components/ShopReviewItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation/rootStackParamList";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops("score", true);
    setShops(shops);
  };

  const onPressShop = (shop: Shop) => {
    navigation.navigate("ShopScreen", { shop });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem
            shop={item}
            onPress={() => {
              onPressShop(item);
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
