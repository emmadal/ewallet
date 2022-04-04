import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {API_TOKEN} from './env';
import URL from './url.json';

const db = firestore();

export const register = async data => {
  const {email, password, fullName, phone, country} = data;
  const res = await auth().createUserWithEmailAndPassword(email, password);
  if (res?.user) {
    const wallet = await createWallet(res?.user?.uid, fullName);
    if (wallet) {
      const address = await getWalletAddress(wallet?.id);
      if (address?.data.length) {
        await db
          .collection('users')
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            email: res.user.email,
            fullName: fullName,
            phoneNumber: phone,
            wallet: {...wallet},
            country,
            photoURL: res.user.photoURL,
            creationTime: res.user.metadata.creationTime,
            isActive: false,
            walletAddress: {...address?.data[0]},
          });
        return res?.user;
      }
    }
  } else {
    return 'Please verify your email address or password';
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
      photoURL: data?.photoURL ?? '',
      kycFiles: data?.kycFiles ?? [],
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

export const uploadKYC = async data => {
  let files = [];
  for (const i of data) {
    const task = await storage()
      .ref('kyc')
      .child(`${i.fileName}`)
      .putFile(i.uri, {
        cacheControl: 'no-store',
      });
    if (task.state === 'success') {
      const url = await storage().ref(`kyc/${i.fileName}`).getDownloadURL();
      files.push({url, filename: i.fileName, id: new Date().getTime()});
    }
  }
  return files;
};

export const getCurrencies = async () => {
  const params = {
    method: 'GET',
    redirect: 'follow',
  };
  const req = await fetch(URL.currencies, params);
  if (req.status === 200) {
    return await req.json();
  }
};

const createWallet = async (userId, userName) => {
  const body = {
    name: `user-${userId}-crypto_usdt`,
    currency: 'USDTETH',
    human: `Owner ${userName}`,
    description: 'Main account',
  };
  const params = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `${new Date().getTime()}`,
    },
    body: JSON.stringify({...body}),
  };
  const req = await fetch(URL.createwallet, params);
  if (req.status === 201) {
    const {data} = await req.json();
    return data;
  } else {
    console.log('ERROR CREATE Wallet: ', await req?.text());
  }
};

const getWalletAddress = async walletId => {
  const params = {
    method: 'GET',
    headers: {
      accept: '*/*',
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const addressURL = `${URL.createwallet}/${walletId}/addresses/`;
  const req = await fetch(addressURL, params);
  if (req?.status === 200) {
    const res = await req.json();
    return res;
  } else {
    console.log('Get Wallet: ', await req?.text());
  }
};
