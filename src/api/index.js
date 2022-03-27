import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as URL from './url.json';
import {API_TOKEN, API_URL} from '@env';

const db = firestore();

export const register = async data => {
  try {
    const {email, password, fullName, phone, currency, country} = data;
    const res = await auth().createUserWithEmailAndPassword(email, password);
    if (res.user) {
      const subscriber = await CreateSubscriber(email, res.user.uid, country);
      console.log({subscriber});
      if (Object.keys(subscriber).length) {
        await db
          .collection('users')
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            email: res.user.email,
            fullName: fullName,
            subscriberId: subscriber?.subscriber_id,
            customerId: subscriber?.id,
            phoneNumber: phone,
            country,
            photoURL: res.user.photoURL,
            creationTime: res.user.metadata.creationTime,
            accounts: [
              {
                id: 1,
                balances: [],
                createdDate: res.user.metadata.creationTime,
                currencyIsoCode: currency,
                currentBalance: 0,
              },
              {
                id: 2,
                balances: [],
                createdDate: res.user.metadata.creationTime,
                currencyIsoCode: 'USDT',
                currentBalance: 0,
              },
            ],
          });
      }
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

export const getCurrencies = async () => {
  const params = {
    method: 'GET',
    redirect: 'follow',
  };
  const req = await fetch(`${API_URL}/${URL.currencies}`, params);
  if (req.status === 200) {
    return await req.json();
  }
};

export const CreateSubscriber = async (email, subscriber_id, country) => {
  const params = {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-type': 'application/json',
      authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({email, subscriber_id, country}),
  };
  const res = await fetch(`${API_URL}/${URL.subscriber}`, params);
  console.log(res);
  if (res.status === 200) {
    return await res.json();
  }
};
