import React, { useContext, useEffect, useState } from "react";
import { router, Slot, useSegments } from "expo-router";

import "../global.css";
import { AuthContextProvider, useAuth } from "@/context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // Check if user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("home");
    } else if (isAuthenticated == false) {
      // redirect to sign in page
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
