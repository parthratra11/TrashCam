import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { router } from "expo-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // OnAuthStateChange Fn

    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("user: ", user);

      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        // profile: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;

      if (msg.includes("invalid-email")) msg = "Invalid email address";
      if (msg.includes("invalid-credential")) msg = "Invalid credentials";

      // setUser(user);
      // setIsAuthenticated(true);

      return { success: false, msg: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // setUser(null);
      // setIsAuthenticated(false);
      // router.replace("/home");
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  // const register = async (email, password, username, profileUrl) => {
  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        // profileUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;

      if (msg.includes("invalid-email")) msg = "Invalid email address";
      if (msg.includes("email-already-in-use")) msg = "Email is already in use";
      if (msg.includes("weak-password"))
        msg = "Password should be atleast 6 characters long";

      return { success: false, msg: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};
