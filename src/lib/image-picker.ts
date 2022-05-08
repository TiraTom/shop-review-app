import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

const getCameraRollPermission = async () => {
  if (Constants.platform?.ios) {
    const {status} = await ImagePicker.getCameraPermissionsAsync()
    if (status !== "granted") {
      alert("画像を選択するにはカメラロールへのアクセス許可が必要です。")
    }
  }
}

export const pickImage = async () => {
  // パーミッションを取得
  await getCameraRollPermission()
  // ImagePickerを起動
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  });

  if (!result.cancelled) {
    return result.uri;
  }
}