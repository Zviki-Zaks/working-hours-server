import { db } from "../../firebase/firebase.config";
import { UserInfo } from "../../model/user.model";

const COLLECTION = "users";
const usersCollectionRef = db.collection(COLLECTION);

export const getUser = async (userId: string) => {
  try {
    const userRef = usersCollectionRef.doc(userId);
    const user = await userRef.get();
    if (!user.exists) {
      console.log("No such document!");
      throw "Can't get user";
    } else {
      console.log("Document data:", user.data());
      return user.data();
    }
  } catch (error) {
    console.log("Can't get user", error);
    throw error;
  }
};

export const addUser = async (userId: string, { email, name }: UserInfo) => {
  try {
    const userRef = usersCollectionRef.doc(userId);
    const res = await userRef.set({ email, name });
    if (!res.writeTime) {
      console.log("Can't add document!");
      throw "Can't add user";
    } else {
      console.log("Document add at:", res.writeTime);
      return { id: userId, email, name };
    }
  } catch (error) {
    console.log("Can't add user", error);
    throw error;
  }
};
