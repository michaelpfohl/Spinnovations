import React, { Component } from 'react';

class Profile extends Component {
  state = {
    userInformation: [],
  };

  render(): JSX.Element {
    return (
      <div id="profilePage">
        <div className="profileCard">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png"
            className="profilePhoto"
          />
          <div>
            <h3 className="userName">Michael Pfohl</h3>
            <div className="buttonGroup">
              <a href="/" id="acctinfo">Account Information</a>
              <a href="/" id="myorders">My Orders</a>
              <a href="/" id="submitinnovation">Submit an innovation</a>
            </div>
            <div className="buttonGroupTwo">
              <a href="/">My Payments</a>
              <a href="/">My Spins</a>
              <a href="/">Help</a>
            </div>
          </div>
          <div className="tailInfo">
            <h5>
              ©2021 Spinnovations inc. 100 Spin Street, Suite 400
            </h5>
            <h5>
              Nashville, TN 37027
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
