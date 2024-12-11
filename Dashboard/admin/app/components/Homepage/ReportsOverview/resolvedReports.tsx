import React, { useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig.js";

const ResolvedReports = async () => {
  const docRef = doc(db, "metrics", "counts");
  const docSnap = await getDoc(docRef);
  let data = docSnap.data();
  console.log(docSnap);

  return (
    <div className="btn m-1 card card-body bg-primary h-4 flex justify-center items-center hover:bg-secondary">
      <h2 className="text-xl font-roboto text-gray-100 font-semibold">
        Resolved Reports:{" "}
        {data.total_count - data.detected_count - data.undetected_count}
      </h2>
    </div>
  );
};

export default ResolvedReports;
