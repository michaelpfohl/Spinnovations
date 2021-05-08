import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import ProfileForm from '../Forms/ProfileForm';
import { UpdateProfileProps } from '../../Helpers/Interfaces/UserInterfaces';

const UpdateProfileModal = ({ user, onUpdate }: UpdateProfileProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="style-button bg-scheme-blue" onClick={toggle}>Update Profile</button>
      <Modal isOpen={modal} toggle={toggle}>
        <ProfileForm user={user} onUpdate={onUpdate}/>
      </Modal>
    </div>
  );
}

export default UpdateProfileModal;