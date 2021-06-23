import React, { useState, useEffect } from 'react';
import { Modal } from 'reactstrap';
import SpinCheckout from '../../Views/SpinCheckout';
import {CheckoutProps} from '../../Helpers/Interfaces/CheckoutInterfaces';

const BuySpinModal = ({user, spinTotal, payments, title, category, callback}: CheckoutProps): JSX.Element => {

  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setGreetingColor(Math.floor(Math.random() * 7) + 1);
  }, [])

  return (
    <div>
      <button className="style-button mb-4 mt-5 bg-scheme-green" onClick={toggle}>{title} for {category}</button>
      <Modal isOpen={modal} toggle={toggle} className={`color-border-${greetingColor}`}>
        <SpinCheckout user={user} payments={payments} spinTotal={spinTotal} callback={callback}/>
      </Modal>
    </div>
  );
}

export default BuySpinModal;