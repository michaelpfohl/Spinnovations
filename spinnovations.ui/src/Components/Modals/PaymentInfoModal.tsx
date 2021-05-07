import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';
import PaymentInfoForm from '../Forms/PaymentInfoForm';
import { PaymentInfoFormProps } from '../../Helpers/Interfaces/PaymentInterfaces';

const UpdatePaymentModal = ({ user, payment, onUpdate, title}: PaymentInfoFormProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>{title}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <PaymentInfoForm user={user} payment={payment} onUpdate={onUpdate}/>
      </Modal>
    </div>
  );
}

export default UpdatePaymentModal;