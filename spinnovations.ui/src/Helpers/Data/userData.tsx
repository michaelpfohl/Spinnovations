import axios from 'axios';
import {BaseURL} from '../config.json';

const userUrl = `${BaseURL}/users`;

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    payment_info_id: number;
    display_name: string;
    profile_picture: string;
    user_created_date: Date;
    state: string;
  }

const GetAllUsers = (): Promise<User[]> => {
    new Promise((resolve, reject) => {
        axios.get(userUrl).then((response) => {
            resolve(response.data);
        }).catch((error) => reject(error));
    });
}

export default GetAllUsers;
