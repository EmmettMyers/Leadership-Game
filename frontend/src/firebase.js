import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  databaseURL: "https://leadership-game-2fc66-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
