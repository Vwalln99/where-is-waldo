// Importe die Funktionen, die du benötigst
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Konfiguration für deine Firebase-App
const firebaseConfig = {
  apiKey: "AIzaSyB6oYXfyoeGLixcFMV3Kyn98zp2uye7hDw",
  authDomain: "where-s-waldo-e7bad.firebaseapp.com",
  projectId: "where-s-waldo-e7bad",
  storageBucket: "where-s-waldo-e7bad.appspot.com",
  messagingSenderId: "399263404205",
  appId: "1:399263404205:web:5992ca4832b04808edf624",
};

// Initialisiere Firebase-App
const app = initializeApp(firebaseConfig);

// Erhalte Auth und Storage Instanzen
const auth = getAuth(app);
const storage = getStorage(app);

// Erhalte Firestore Instanz
const db = getFirestore(app);

// Beispiel zum Zugriff auf eine Firestore-Sammlung
const bestenlisteCollection = collection(db, "Bestenliste");

// Beispiel für das Lesen von Daten aus der Firestore-Sammlung
const readBestenlisteData = async () => {
  try {
    const querySnapshot = await getDocs(bestenlisteCollection);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error("Fehler beim Lesen der Bestenliste:", error);
  }
};

// Beispielaufruf zum Lesen der Bestenliste-Daten
readBestenlisteData();

// Exportiere die benötigten Instanzen
export { app, auth, storage, db };
