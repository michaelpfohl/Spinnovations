import axios from 'axios';
import { BaseURL } from '../config.json';
import {Payment} from '../Interfaces/PaymentInterfaces'

const paymentsURL = `${BaseURL}/PaymentInformation`;

const getPayments = (): Promise<Payment[]> => new Promise((resolve, reject) => {
    axios.get(`${paymentsURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getUserPayments = (userId: number): Promise<Payment[]> => new Promise((resolve, reject) => {
    axios.get(`${paymentsURL}/myPayments/${userId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const addPayment = (payment: Payment): Promise<Payment> => new Promise((resolve, reject) => {
    axios.post(`${paymentsURL}`, payment).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const updatePayment = (payment: Payment): Promise<void> => axios.put(`${paymentsURL}/${payment.id}`, payment);

const deletePaymentInfo = (paymentId: number): Promise<void> => axios.put(`${paymentsURL}/delete/${paymentId}`, paymentId);

//comment for git commit to fix an error
const paymentData = {
    getPayments,
    getUserPayments,
    addPayment,
    updatePayment,
    deletePaymentInfo
}
export default paymentData;
