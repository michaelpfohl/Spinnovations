import React, { useState, useEffect } from 'react';
import { Modal } from 'reactstrap';
import PaymentInfoForm from '../Forms/PaymentInfoForm';
import { PaymentInfoFormProps } from '../../Helpers/Interfaces/PaymentInterfaces';

const UpdatePaymentModal = ({ user, payment, onUpdate, title}: PaymentInfoFormProps): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);

    
  useEffect(() => {
    setGreetingColor(Math.floor(Math.random() * 7) + 1);
  })

  return (
    <div>
      <button className="cart-button p-2 color-cart-4 text-white" onClick={toggle}>{title}</button>
      <Modal isOpen={modal} toggle={toggle} className={`color-border-${greetingColor}`}>
        <PaymentInfoForm user={user} payment={payment} onUpdate={onUpdate} color={greetingColor}/>
      </Modal>
    </div>
  );
}

export default UpdatePaymentModal;