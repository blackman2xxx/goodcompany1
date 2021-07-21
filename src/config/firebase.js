import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCJ7qs12BPHbyAMaNDpF-VKsPf5I6NMn0w",
  authDomain: "reviewcompany-7f43c.firebaseapp.com",
  projectId: "reviewcompany-7f43c",
  storageBucket: "reviewcompany-7f43c.appspot.com",
  messagingSenderId: "1057472142400",
  appId: "1:1057472142400:web:670dccbdf6d93ad29ad3a5"
});

export const auth = app.auth();
export const firestore = app.firestore();

export const createNewUser = async ({ name, email, pass }) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      pass
    );
    await firestore
      .collection("users")
      .doc(userCredential.uid)
      .set({ name: name, email: email });
  } catch (error) {
    throw error;
  }
};
export const storage = app.storage();

//loicd - get all companies
export const getCompanies = async () => {
  try {
    const model = await firestore.collection("companies").get();
    const results = model.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getCompaniesActive = async () => {
  try {
    const model = await firestore.collection("companies").where('is_active','==',1).get();
    const results = model.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
// loicd - add new company
export const addCompany = async (item) => {
  try {
    const model = firestore.collection("companies");
    await model.add(item);
  } catch (err) {
    console.log(err);
  }
};

//loicd - upload image
export const uploadImage = async (image) => {
  const ref = storage.ref().child(`/images/logos/${image.name}`);
  let downloadUrl = "";
  try {
    await ref.put(image);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};

//loicd - update company
export const updateCompany = async (item) => {
  try {
    const model = firestore.collection("companies").doc(item.id);
    await model.update(item);
  } catch (err) {
    console.log(err);
  }
};

//loicd - remove company
export const removeCompany = async (item) => {
  const model = firestore.collection("companies");
  try {
    const company = model.doc(item.id);
    await company.delete();
  } catch (err) {
    console.log(err);
  }
};

//loicd - validation for company
export const validateAddCompany = async (name, site) => {
    const all = firestore.collection("companies").get();
    let ck = false;
    try{
        (await all).forEach((item)=>{
            if(name === item.data().name && site === item.data().site){
                ck = true;
            }
        })
    } catch (err) {
        console.log(err);
    }
    return ck;
}
