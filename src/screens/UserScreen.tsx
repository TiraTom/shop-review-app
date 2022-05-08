import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Timestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Loading } from "../components/Loading";
import { UserContext } from "../contexts/userContext";
import { updateUser } from "../lib/firebase";
import { RootStackParamList } from "../types/navigation/rootStackParamList";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "UserScreen">;
  route: RouteProp<RootStackParamList, "UserScreen">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext);
  if (!user || !user.id) {
    // ログイン必須なんだけど、とりあえずでエラーにせず早期リターンしている
    return <></>;
  }

  const uid = user.id;

  const [name, setName] = useState<string>(user.name);

  const onSubmit = async () => {
    setLoading(true);
    const updatedAt = Timestamp.now();
    await updateUser(uid, { name, updatedAt: updatedAt });
    setUser({ ...user, name, updatedAt });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する"></Button>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
