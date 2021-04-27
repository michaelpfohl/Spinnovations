import firebase from 'firebase';
import 'firebase/auth';

const getUid = (): string => firebase.auth().currentUser?.uid;

const authData = { getUid };

export default authData;