import {
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { PaymentInfoFormProps, PaymentProps } from "../../Helpers/Interfaces/PaymentInterfaces";
import PaymentInfoModal from "../../Components/Modals/PaymentInfoModal";
import paymentData from '../../Helpers/Data/PaymentData';

const getCardCompany = (payment: PaymentProps) : string => {
  switch (payment.card_Company) {
    case "1":
      return "American Express";
    case "2":
      return "Discover";
    case "3":
      return "Mastercard";
    case "4":
      return "Visa";
    default: 
    return "Credit Card";
  }
}
const PaymentInfoCard = ({ payment, onUpdate, user }: PaymentInfoFormProps): JSX.Element => {
  return (
    <div className="col-lg-3 mb-4" key={payment.id}>
      <div className={`product-card`}>
          <div className="product-name">{payment.card_Number}</div>
          <div className="d-flex justify-content-center justify-content-space-between p-2">
            <div className="mr-2">
              EXP: {payment.expiration_Month}/{payment.expiration_Year}
            </div>
            <div className="ml-2">CVV: {payment.cvv}</div>
          </div>
          <div className="product-name">{getCardCompany(payment)}</div>
          <div className="justify-content-space-between p-2">
          <PaymentInfoModal user={user} payment={payment} onUpdate={onUpdate} title={"Edit Card"}/>
          <button className={`cart-button payment-delete-button p-2 m-2`} onClick={() => {
                paymentData.deletePaymentInfo(payment.id).then(() => {
                  onUpdate();
                });
              }
            }>
            Remove Card
          </button>
          </div>
        </div>
    </div>
  );
};

export {PaymentInfoCard, getCardCompany};
