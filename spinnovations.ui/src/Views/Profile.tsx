import React from "react";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import { Link } from "react-router-dom";

type UserProps = {
  user: User;
};

class Profile extends React.Component<UserProps> {
  render(): JSX.Element {
    const { user } = this.props;
    return (
      <div id="profilePage">
        {user != null && (
          <div className="profileCard">
            <div className="editBtn">
              <a href="/">
                <i className="fas fa-pencil-alt">...</i>
              </a>
            </div>
            <img src={user.image_Url} className="profilePhoto" />
            <div>
              <h3 className="userName">{user.display_Name}</h3>
              <div className="buttonGroup">
                <Link
                  to={{
                    pathname: "/Update-Profile",
                    state: {
                      user: user,
                    },
                  }}
                >
                  Update Profile
                </Link>
                <Link
                  to={{
                    pathname: "/orders",
                    state: {
                      user: user,
                    },
                  }}
                >
                  My Orders
                </Link>
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
        )}
      </div>
    );
  }
}

export default Profile;
