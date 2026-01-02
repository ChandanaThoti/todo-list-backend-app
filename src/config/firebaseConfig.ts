import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("account_services.json").toString()
);

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
