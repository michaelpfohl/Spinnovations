import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';
import ProductForm from '../Forms/ProductForm';
import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';

const UpdateProductModal = ({ user, product, onUpdate }: ProductProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="mt-4 mb-4 d-block" onClick={toggle}>Update</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ProductForm user={user} product={product} onUpdate={onUpdate}/>
      </Modal>
    </div>
  );
}

export default UpdateProductModal;