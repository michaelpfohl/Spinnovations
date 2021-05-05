import { Card, Button, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';
import {PaymentProps} from '../../Helpers/Interfaces/PaymentInterfaces';

const PaymentInfoCard = ({payment}: PaymentProps): JSX.Element => {
  return (
    <div className='p-5'>
      <Card>
        <CardBody>
          <CardTitle tag="h3">{payment.card_Number}</CardTitle>
          <div className='d-flex justify-content-center p-2'>
            <CardText className='mr-4'>EXP: {payment.expiration_Month}/{payment.expiration_Year}</CardText>
            <CardText>CVV: {payment.cvv}</CardText>
          </div>
        <CardText tag="h3">{payment.card_Company}</CardText>
          <Button>Edit</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentInfoCard;