import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'reactstrap';
import ProductForm from '../Forms/ProductForm';
import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';

const UpdateProductModal = ({ user, product, onUpdate }: ProductProps): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);

  
  useEffect(() => {
    setGreetingColor(Math.floor(Math.random() * 7) + 1);
  })

  return (
    <div>
      <Button color="danger" onClick={toggle}>Update</Button>
      <Modal isOpen={modal} toggle={toggle} className={`color-border-${greetingColor}`}>
        <ProductForm user={user} product={product} onUpdate={onUpdate} color={greetingColor}/>
      </Modal>
    </div>
  );
}

export default UpdateProductModal;