import { getFirestore, collection, query, updateDoc } from "firebase/firestore";
import { CollectionReference, doc, getDoc, getDocs, orderBy, setDoc } from "@firebase/firestore";
import { Shop } from "../types/firestore/shop";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth'
import Constants from "expo-constants";
import { initialUser, User } from "../types/auth/user";
import { Review } from "../types/firestore/review";


const firebaseApp = initializeApp(Constants.manifest?.extra?.firebase);

const firestore = getFirestore(firebaseApp);
const auth = getAuth();

const shopsColRef = collection(
  firestore,
  "shops"
) as CollectionReference<Shop>;

const usersColRef = collection(
  firestore,
  "users"
) as CollectionReference<User>;

export const getShopDocumentById = async (id: string) => {
  const shopDocRef = doc(shopsColRef, id);
  const shopDoc = await getDoc(shopDocRef);
  return shopDoc.data();
};

export const getShops = async (orderByConditionFieldName: string, isOrderByDirectionDesc: boolean = true) => {
  const shopSnapshot = await getDocs(query(shopsColRef, orderBy(orderByConditionFieldName, isOrderByDirectionDesc ? "desc": "asc")));
  return shopSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id }) as Shop);
};

export const signIn = async () => {
  const userCredential = await signInAnonymously(auth)
  const {uid} = userCredential.user
  
  const userDocRef = doc(usersColRef, uid)
  const userDoc = await getDoc(userDocRef)
  if (!userDoc.exists()) {
    setDoc(userDocRef, initialUser)
    return {
      ...initialUser,
      id: uid
    } as User
  } else {
    return {
      // userDocはidが含まれない仕様になっているが処理上持っておきたいので、idを手動設定
      id: uid,
      ...userDoc.data()
    } as User
  }
}

export const updateUser = async(userId: string, params: any) => {
  const userDocRef = doc(usersColRef, userId)
  updateDoc(userDocRef, params)
}

export const createReviewRef = async (shopId: string) => {
  const shopDocRef = doc(shopsColRef, shopId);
  const reviewsColRef = collection(
    shopDocRef,
    "reviews"
  ) as CollectionReference<Review>;

  return doc(reviewsColRef)
}


export const uploadImage = async (uri: string, path: string) => {
  // uriをblobに変換
  const localUri = await fetch(uri);
  const blob = localUri.blob;
  // storageにupload
  const ref = doc(shopsColRef, path); 
  
  let downloadUri = "";
  try {

  } catch(err) {
    
  }
}