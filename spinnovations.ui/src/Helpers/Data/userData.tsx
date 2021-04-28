import axios from 'axios';
import {BaseURL} from '../config.json';

const usersUrl = `${BaseURL}/users`;

export interface User {
    id: number;
    first_Name: string;
    last_Name: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    payment_Info_Id: number;
    display_Name: string;
    profile_Picture: string;
    user_Created_Date: Date;
    state: string;
    firebase_Uid: string;
  }

const getAllUsers = (): Promise<User[]> => new Promise((resolve, reject) => {
    axios.get(usersUrl).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
});

const getUserByFirebaseUid = (firebase_Uid: string): Promise<User> => new Promise((resolve, reject) => {
    axios.get(`${usersUrl}/firebase/${firebase_Uid}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
});

const userData = {
    getAllUsers,
    getUserByFirebaseUid
}

export default userData;
