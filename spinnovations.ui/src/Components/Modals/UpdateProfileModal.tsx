import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';
import ProfileForm from '../Forms/ProfileForm';
import { UpdateProfileProps } from '../../Helpers/Interfaces/UserInterfaces';

const UpdateProfileModal = ({ user, onUpdate }: UpdateProfileProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Update Profile</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ProfileForm user={user} onUpdate={onUpdate}/>
      </Modal>
    </div>
  );
}

export default UpdateProfileModal;