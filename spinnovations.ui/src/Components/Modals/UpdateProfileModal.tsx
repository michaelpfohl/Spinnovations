import React, { useState, useEffect } from 'react';
import { Modal } from 'reactstrap';
import ProfileForm from '../Forms/ProfileForm';
import { UpdateProfileProps } from '../../Helpers/Interfaces/UserInterfaces';

const UpdateProfileModal = ({ user, onUpdate }: UpdateProfileProps): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [greetingColor, setGreetingColor] = useState(0);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setGreetingColor(Math.floor(Math.random() * 7) + 1);
  }, [])

  return (
    <div>
      <button className="style-button bg-scheme-blue" onClick={toggle}>Update Profile</button>
       <Modal isOpen={modal} toggle={toggle} className={`update-profile-modal color-border-${greetingColor}`}>
        <ProfileForm user={user} onUpdate={onUpdate} color={greetingColor}/>
      </Modal>
    </div>
  );
}

export default UpdateProfileModal;
