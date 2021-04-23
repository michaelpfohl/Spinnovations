import axios from 'axios';
import { BaseURL } from '../config.json';

const paymentsURL = `${BaseURL}/PaymentInformation`;

export interface Payment {
    id: number;
    card_Number: string;
    expiration_Month: number;
    expiration_Year: number;
    cvv: number;
    customer_Id: number;
    card_Company: string;
}

const getPayments = (): Promise<Payment[]> => new Promise((resolve, reject) => {
    axios.get(`${paymentsURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const paymentData = {
    getPayments
}
export default paymentData;
