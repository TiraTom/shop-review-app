import { RouteProp } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, View, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation/rootStackParamList";
import { useContext, useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { createReviewRef } from "../lib/firebase";
import { Review } from "../types/firestore/review";
import { UserContext } from "../contexts/userContext";
import { Timestamp } from "firebase/firestore";
import { pickImage } from "../lib/image-picker";
import { getExtention } from "../utils/file";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReviewScreen">;
  route: RouteProp<RootStackParamList, "CreateReviewScreen">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");

  const { user } = useContext(UserContext);
  if (!user) {
    // 認証後に遷移する画面なのでuserがnullになることはない想定
    console.warn("userがnull");
    return <>ログインしてください</>;
  }

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton
          name="x"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [shop]);

  const onSubmit = async () => {
    if (!user.id) {
      console.warn("userIdが空");
      return null;
    }
    if (!shop.id) {
      console.warn("shopIdが空");
      return null;
    }

    // documentのidを取得
    const reviewDocRef = await createReviewRef(shop.id);
    // storageのpathを指定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;

    // 画像をstorageにアップロード

    // reviewドキュメントを作る

    const review: Review = {
      text,
      score,
      user: {
        id: user.id,
        name: user.name,
      },
      shop: {
        id: shop.id,
        name: shop.name,
      },
      updatedAt: Timestamp.now(),
      createAt: Timestamp.now(),
    };

    await createReviewRef(shop.id, review);
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="レビュー"
        placeholder="レビューを書いてください"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc#" />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button onPress={onSubmit} text="レビューを投稿する" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
