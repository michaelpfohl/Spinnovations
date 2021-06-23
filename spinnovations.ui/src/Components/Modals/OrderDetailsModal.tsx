import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { OrderProps } from '../../Helpers/Interfaces/OrderInterfaces';
import OrderDetailsCard from '../Cards/OrderDetailsCard';
import { Table } from "reactstrap";

const OrderDetailsModal
 = ({order}: OrderProps) : JSX.Element => {

  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);
  const orderDetailsCard = (order: OrderProps): JSX.Element => {
    const orderDetailsCardsArray = [];
    for (let i = 0; i < order.products.length; i++) {
      orderDetailsCardsArray.push(<OrderDetailsCard key={order.id} order_Details={order.order_Details[i]} product={order.products[i]}/>)
    }
    const cards = orderDetailsCardsArray.map((card) => card);
    return (<tbody>{cards}</tbody>)
  };

  useEffect(() => {
    setGreetingColor(Math.floor(Math.random() * 7) + 1);
  }, [])

  return (
    <div>
      <button className="style-button bg-scheme-yellow" onClick={toggle}>See Details</button>
      <Modal isOpen={modal} toggle={toggle} className={`color-border-${greetingColor}`}>
        <ModalHeader toggle={toggle} className={`color-text-${greetingColor}`}>Order Details</ModalHeader>
        <ModalBody>
          <Table className={`orders-table color-half-border-${greetingColor}`}>
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
          <button className="style-button logout-button" onClick={toggle}>Exit</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default OrderDetailsModal;