import axios from 'axios';
import { BaseURL } from '../config.json';
import { User } from '../Interfaces/UserInterfaces';

const usersUrl = `${BaseURL}/users`;

const getAllUsers = (): Promise<User[]> => new Promise((resolve, reject) => {
    axios.get(usersUrl).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
});

const getUserById = (id: number): Promise<User> => new Promise((resolve, reject) => {
    axios.get(`${usersUrl}/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
});

const getUserByFirebaseUid = (firebase_Uid: string): Promise<User> => new Promise((resolve, reject) => {
    axios.get(`${usersUrl}/firebase/${firebase_Uid}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
});

const AddNewUser = (user: User): Promise<User> => new Promise((resolve, reject) => {
    axios.post(`${usersUrl}`, user).then((response) => {
        return response.data;
    }).catch((error) => reject(error));
});

const updateUser = (user: User): Promise<User> => new Promise((resolve, reject) => {
    axios.put(`${usersUrl}/${user.id}`).then((response) => {
        return response.data;
    }).catch((error) => reject(error));
});

const userData = {
    getAllUsers,
    getUserByFirebaseUid,
    AddNewUser,
    getUserById,
    updateUser,
}

export default userData;
