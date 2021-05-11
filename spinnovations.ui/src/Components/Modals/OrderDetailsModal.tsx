import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { OrderProps } from '../../Helpers/Interfaces/OrderInterfaces';
import OrderDetailsCard from '../Cards/OrderDetailsCard';
import { Table } from "reactstrap";

const OrderDetailsModal
 = ({order}: OrderProps) : JSX.Element => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const orderDetailsCard = (order: OrderProps): JSX.Element => {
    const orderDetailsCardsArray = [];
    for (let i = 0; i < order.products.length; i++) {
      orderDetailsCardsArray.push(<OrderDetailsCard order_Details={order.order_Details[i]} product={order.products[i]}/>)
    }
    const cards = orderDetailsCardsArray.map((card) => card);
    return (<tbody>{cards}</tbody>)
  };

  return (
    <div>
      <button className="style-button bg-scheme-yellow" onClick={toggle}>See Details</button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <Table>
          <thead>
            <tr>
              <th scope="row"></th>
              <th></th>
              <th>Product</th>
              <th>Creator</th>
              <th>Cost</th>
              <th>Quantity</th>
            </tr>
          </thead>
            {orderDetailsCard(order)}
            </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default OrderDetailsModal;