import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";

export const register = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    try {
      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
        createdAt: new Date().toISOString(),
      });
    } catch (firestoreError) {
      // If Firestore write fails, delete the auth user to maintain consistency
      await user.delete();
      if (firestoreError instanceof FirebaseError) {
        throw new Error(
          "Permission denied: Unable to create user profile. Please contact an administrator."
        );
      }
      throw firestoreError;
    }

    return user;
  } catch (err) {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/email-already-in-use":
          throw new Error("Email is already registered");
        case "auth/invalid-email":
          throw new Error("Invalid email address");
        case "auth/operation-not-allowed":
          throw new Error(
            "Operation not allowed. Please contact an administrator"
          );
        case "auth/weak-password":
          throw new Error("Password is too weak");
        default:
          throw new Error("Registration failed. Please try again");
      }
    }
    throw err;
  }
};
