import axios from 'axios';
import config from '../config';
import {Payment} from '../Interfaces/PaymentInterfaces'

const paymentsURL = `${config.BaseURL}/PaymentInformation`;

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

const validateCardExp = (payment: Payment): boolean => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (
          parseInt(payment.expiration_Year) > currentYear ||
          (parseInt(payment.expiration_Year) === currentYear &&
            parseInt(payment.expiration_Month) >= currentMonth)
        ) {
            return true
        } else {
            return false;
        }
    }


//comment for git commit to fix an error
const paymentData = {
    getPayments,
    getUserPayments,
    addPayment,
    updatePayment,
    deletePaymentInfo,
    validateCardExp,
}
export default paymentData;
