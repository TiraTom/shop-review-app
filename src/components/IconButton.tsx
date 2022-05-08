import React, { ComponentProps } from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name: ComponentProps<typeof Feather>["name"];
  color?: string;
};

export const IconButton: React.FC<Props> = ({
  onPress,
  name,
  color = "#000",
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name={name} color={color} size={32}></Feather>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
