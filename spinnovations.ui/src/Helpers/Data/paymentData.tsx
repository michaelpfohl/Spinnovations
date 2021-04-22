import axios from 'axios';
import {BaseURL} from '../config.json';

const paymentsURL = `${BaseURL}/payments`;

interface Payment{
    Id: number;
    Card_Number: string;
    Expiration_Month: number;
    Expiration_Year: number;
    CVV: number;
    Customer_Id: number;
    Card_Company: string;
}

const GetAllPayments = (): Promise<Payment> => {
    return new Promise((resolve, reject) =>
        axios.get(paymentsURL).then(response => resolve(response.data))
        );
}

export default { GetAllPayments }
