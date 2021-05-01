import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';

type UserProps = {
  user: User | null;
};

type UserState = {
  user?: User | null;
};

class Profile extends React.Component<UserProps, UserState> {
  state = {
    user: null,
  };

  render(): JSX.Element {
    const { user } = this.state;
    return (
      <div id="profilePage">
        <div className="profileCard">
          <div className="editBtn">
            <a href="/">
              <i className="fas fa-pencil-alt">...</i>
            </a>
          </div>
          <img src="{user.profile_Picture}" className="profilePhoto" />
          <div>
            <h3 className="userName">
              {user.first_Name} {user.last_Name}
            </h3>
            <div className="buttonGroup">
              <a href="/" id="acctinfo">
                Account Information
              </a>
              <a href="/" id="myorders">
                My Orders
              </a>
              <a href="/" id="submitinnovation">
                Submit an innovation
              </a>
            </div>
            <div className="buttonGroupTwo">
              <a href="/">My Payments</a>
              <a href="/">My Spins</a>
              <a href="/">Help</a>
            </div>
          </div>
          <div className="tailInfo">
            <h5>©2021 Spinnovations inc. 100 Spin Street, Suite 400</h5>
            <h5>Nashville, TN 37027</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
