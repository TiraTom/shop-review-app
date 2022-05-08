import { Shop } from "../firestore/shop";

export type RootStackParamList = {
  MainScreen: undefined,
  HomeScreen: undefined,
  ShopScreen: {shop: Shop},
  UserScreen: undefined,
  CreateReviewScreen: {shop: Shop},
}