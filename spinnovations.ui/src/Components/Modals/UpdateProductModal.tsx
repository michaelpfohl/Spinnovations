import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import ProductForm from '../Forms/ProductForm';
import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';

const UpdateProductModal = ({ user, product, onUpdate }: ProductProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="style-button mb-4 bg-scheme-yellow" onClick={toggle}>Update</button>
      <Modal isOpen={modal} toggle={toggle}>
        <ProductForm user={user} product={product} onUpdate={onUpdate}/>
      </Modal>
    </div>
  );
}

export default UpdateProductModal;