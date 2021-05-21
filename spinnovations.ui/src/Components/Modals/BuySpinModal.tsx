import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import SpinCheckout from '../../Views/SpinCheckout';
import {CheckoutProps} from '../../Helpers/Interfaces/CheckoutInterfaces';

const BuySpinModal = ({user, spinTotal, payments, title, category, callback}: CheckoutProps): JSX.Element => {

  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="style-button mb-4 bg-scheme-green" onClick={toggle}>{title} for {category}</button>
      <Modal isOpen={modal} toggle={toggle} className={`color-border-${greetingColor}`}>
        <SpinCheckout user={user} payments={payments} spinTotal={spinTotal} callback={callback}/>
      </Modal>
    </div>
  );
}

export default BuySpinModal;