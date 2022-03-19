import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const db = firestore();

export const register = async data => {
  try {
    const {email, password, fullName, phone} = data;
    const res = await auth().createUserWithEmailAndPassword(email, password);
    if (res.user) {
      await db
        .collection('users')
        .doc(res.user.uid)
        .set({
          uid: res.user.uid,
          email: res.user.email,
          fullName: fullName,
          phoneNumber: phone,
          photoURL: res.user.photoURL,
          creationTime: res.user.metadata.creationTime,
          accounts: [
            {
              id: 1,
              accountName: 'XOF',
              balances: [],
              createdDate: res.user.metadata.creationTime,
              currencyIsoCode: 'XOF',
              currentBalance: 0,
            },
            {
              id: 2,
              accountName: 'USDT',
              balances: [],
              createdDate: res.user.metadata.creationTime,
              currencyIsoCode: 'USDT',
              currentBalance: 0,
            },
          ],
        });
      return res.user;
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return 'That email address is already in use!';
    }
    if (error.code === 'auth/invalid-email') {
      return 'That email address is invalid!';
    }
  }
};

export const login = async data => {
  const {email, password} = data;
  const res = await auth().signInWithEmailAndPassword(email, password);
  if (res.user) {
    const doc = await db.collection('users').doc(res.user.uid).get();
    if (doc.exists) {
      return doc.data();
    }
  }
};

export const logout = async () => {
  return await auth().signOut();
};

export const getProfile = async uid => {
  const doc = await db.collection('users').doc(uid).get();
  if (doc.exists) {
    return doc.data();
  }
};

export const updateProfile = async (user, data) => {
  await db
    .collection('users')
    .doc(user?.uid)
    .update({
      fullName: data?.fullName ?? user?.fullName,
      phoneNumber: data?.phoneNumber ?? user?.phoneNumber,
      photoURL: data?.photoURL ?? user?.photoURL,
      updatedAt: new Date().toISOString(),
    });
  return await getProfile(user?.uid);
};

export const checkAuth = () => {
  auth().onAuthStateChanged(async user => {
    await getProfile(user?.uid);
  });
};

export const uploadFile = async data => {
  const task = await storage()
    .ref('users')
    .child(`${data?.fileName}`)
    .putFile(data?.uri, {
      cacheControl: 'no-store',
    });
  if (task.state === 'success') {
    const url = await storage().ref(`users/${data?.fileName}`).getDownloadURL();
    return url;
  }
};
