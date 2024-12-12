"use client";

import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig.js";

const PendingReports = () => {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "metrics", "counts");

    const unsub = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPendingCount(data.detected_count || 0);
        } else {
          console.log("No such document!");
          setPendingCount(0);
        }
      },
      (error) => {
        console.log("Error listening to document:", error);
        setPendingCount(0);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="btn m-1 card card-body bg-primary h-4 flex justify-center items-center hover:bg-secondary">
      <h2 className="text-xl font-roboto text-gray-100 font-semibold">
        Pending Reports: {pendingCount}
      </h2>
    </div>
  );
};

export default PendingReports;
