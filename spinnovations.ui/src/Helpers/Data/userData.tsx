import axios from 'axios';
import config from '../config';
import { User } from '../Interfaces/UserInterfaces';

const usersUrl = `${config.BaseURL}/users`;

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

const updateUser = (user: User): Promise<User> => axios({
    method: 'PUT',
    url: `${usersUrl}/${user.id}`, 
    data: JSON.stringify(user), 
    headers:{'Content-Type': 'application/json; charset=utf-8'}
});

const deleteUser = (userId: number): Promise<void> => axios.put(`${usersUrl}/delete/${userId}`, userId);

const userData = {
    getAllUsers,
    getUserById,
    getUserByFirebaseUid,
    AddNewUser,
    updateUser,
    deleteUser,
}

export default userData;
