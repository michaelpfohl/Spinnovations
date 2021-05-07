import {
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { PaymentInfoFormProps, PaymentProps } from "../../Helpers/Interfaces/PaymentInterfaces";
import PaymentInfoModal from "../../Components/Modals/PaymentInfoModal";

const PaymentInfoCard = ({ payment, onUpdate, user }: PaymentInfoFormProps): JSX.Element => {
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
  return (
    <div className="p-5">
      <Card style={{ width: "25em" }} className="d-flex align-items-center">
        <CardBody>
          <CardTitle tag="h2">{payment.card_Number}</CardTitle>
          <div className="justify-content-space-between p-2">
            <CardText>
              EXP: {payment.expiration_Month}/{payment.expiration_Year}
            </CardText>
            <CardText>CVV: {payment.cvv}</CardText>
          </div>
          <CardText tag="h3">{getCardCompany(payment)}</CardText>
          <div className="justify-content-space-between p-2">
          <PaymentInfoModal user={user} payment={payment} onUpdate={onUpdate} title={"Edit Card"}/>
            <Button color="danger">Remove</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentInfoCard;
