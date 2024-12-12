import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDoc);

    if (!userSnap.exists()) {
      throw new Error("No user data found!");
    }

    const { role } = userSnap.data();
    if (role === "admin") return "/admin";
    if (role === "zonal head") return "/zonal-head";
    if (role === "driver") return "/driver";

    throw new Error("Invalid role!");
  } catch (err) {
    throw err;
  }
};
