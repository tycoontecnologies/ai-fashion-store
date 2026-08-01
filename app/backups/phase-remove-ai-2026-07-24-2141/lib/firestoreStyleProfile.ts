import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export interface StyleProfile {
  style: string;
  occasion: string;
  color: string;
}

export async function saveStyleProfile(
  profile: StyleProfile
) {
  await addDoc(
    collection(
      db,
      "styleProfiles"
    ),
    profile
  );
}

export async function getStyleProfiles() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "styleProfiles"
      )
    );

  return snapshot.docs.map(
    (docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })
  );

}