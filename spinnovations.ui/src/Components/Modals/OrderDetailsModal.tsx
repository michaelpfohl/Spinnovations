import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { OrderDetails, OrderProps } from '../../Helpers/Interfaces/OrderInterfaces';

const OrderDetailsModal
 = (props: OrderProps) => {
  const {
    title,
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default OrderDetailsModal;