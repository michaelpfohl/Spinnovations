import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import Checkout from '../../Views/Checkout';
import {CheckoutProps} from '../../Helpers/Interfaces/CheckoutInterfaces';

const PlaceOrderModal = ({user, products, cartTotal, payments, title, productQuantities}: CheckoutProps): JSX.Element => {

  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="style-button mb-4 bg-scheme-green" onClick={toggle}>{title}</button>
      <Modal isOpen={modal} toggle={toggle} className={`color-border-${greetingColor}`}>
        <Checkout user={user} payments={payments} cartTotal={cartTotal} products={products} productQuantities={productQuantities}/>
      </Modal>
    </div>
  );
}

export default PlaceOrderModal;