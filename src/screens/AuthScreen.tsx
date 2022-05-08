import { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../contexts/userContext";
import { signIn } from "../lib/firebase";

type Props = {};

export const AuthScreen: React.FC<Props> = ({}: Props) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await signIn();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>ログイン中...</Text>
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
  text: {
    marginTop: 16,
    fontSize: 12,
    color: "#888",
  },
});
