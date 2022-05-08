import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Shop } from "../types/firestore/shop";
import { Stars } from "./Stars";

type Props = {
  shop: Shop;
  onPress: () => void;
};

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;

export const ShopReviewItem: React.FC<Props> = ({ shop, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: shop.imageUrl }} style={styles.image} />
      <Text style={styles.nameText}>{shop.name}</Text>
      <Text style={styles.placeText}>{shop.place}</Text>
      <Stars score={shop.score} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontWeight: "bold",
  },
  placeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
