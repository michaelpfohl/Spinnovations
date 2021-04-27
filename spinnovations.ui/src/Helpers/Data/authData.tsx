import firebase from 'firebase';
import 'firebase/auth';

const getUid = (): string | undefined => firebase.auth().currentUser?.uid;

const authData = { getUid };

export default authData;